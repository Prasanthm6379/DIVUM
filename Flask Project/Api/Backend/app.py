from flask import Flask, jsonify, request, Response,make_response
import psycopg2 as psy
from datetime import datetime, timedelta
from flask_cors import CORS
import bcrypt
import os
from functools import wraps
import jwt

app = Flask(__name__)
CORS(app, origins="*")
con = psy.connect(
    database="Divum",
    user="postgres",
    password="123",
    host="localhost",
    port='5432'
)
secrect_key = os.environ.get('SECRECT_KEY') or "MySeCrEcTkEy"
app.config['SECRECT_KEY'] = secrect_key
cursor = con.cursor()


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        token = request.headers['access-token']
        if 'test' in request.headers and token:
            return f('user',*args,**kwargs)
        else:
            # if 'access-token' in request.headers:
            if not token:
                return jsonify({"message": "Token is invald!"}), 401
            try:
                data = jwt.decode(token, app.config['SECRECT_KEY'])
                cur_user=data['username']
            except:
                return jsonify({"message": "Token is invald!"}), 401
            return f(cur_user, *args, **kwargs)
    return decorated


@app.route('/')
def home():
    return "<h1 style='text-align:center;'>Welcome to Divum API<h1>"


@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        byte = data['pass'].encode('utf8')
        salt = bcrypt.gensalt(12)
        hashpwd = bcrypt.hashpw(byte, salt)
        try:
            cursor.execute('insert into login (username,pass) values (%s,%s)', [
                           data['username'], hashpwd.decode('utf8')])
        except Exception as e:
            con.rollback()
            return jsonify({"message": "User already exists"}), 409
        con.commit()
        return Response("Sucess", 200)
    except Exception as e:
        return Response("User already exist", 204)



def tokenGen(user):
    token=jwt.encode({
        'username':user,
        'exp':datetime.utcnow()+timedelta(minutes=30)
    },app.config['SECRECT_KEY'])
    return token.decode('utf8')

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        userbyte = data['pass'].encode('utf8')
        cursor.execute('select pass from login where username=%s', [
                       data['username']])
        user = cursor.fetchall()
        if(len(user)==0):
            return jsonify({"Result":"User not found"}),404
        userpwd = user[0][0].encode('utf8')
        res = bcrypt.checkpw(userbyte, userpwd)
        if(not res):
            return jsonify({"Result":res,'error':'Incorrect password'})
        token=tokenGen(data['username'])
        response=make_response(jsonify({"Result":res,'access_token':token}))
        response.set_cookie('access_token',token,httponly=False)
        return response
    except Exception as e:
        return jsonify({"Result": False,
                        'error':e}), 404


@app.route('/getone/<mail>', methods=['GET'])
def getOne(mail):
    try:
        cursor.execute(
            'select email,firstName,lastName,mobile,address,dateOfBirth from details where email=%s', [mail])
        data = cursor.fetchall()
        if len(data)==0:
            return jsonify({'message':"user not found"}),404
        return jsonify(data, 200), 200
    except Exception as e:
        return jsonify({'error':'something went wrong'}),500


@app.route('/mails', methods=['GET'])
def mails():
    cursor.execute('select email from details')
    data = cursor.fetchall()
    try:
        res = []
        for mail in data:
            res.append({
                'email': mail
            })
        return jsonify(res)
    except Exception as e:
        return Response("Error: ", e)


@app.route('/getDetails', methods=['GET'])
@token_required
def getAll(user):
    try:
        cursor.execute(
            'select email,firstName,lastName,mobile,dateOfBirth from details where username=%s order by updateDate desc', [user])
        data = cursor.fetchall()
        if data:
            res = []
            for user in data:
                res.append({
                    'email': user[0],
                    'firstName': user[1],
                    'lastName': user[2],
                    'mobile': user[3],
                    'dateOfBirth': user[4]
                })
            return jsonify(res)
        else:
            return jsonify({"message":"No data present"}),204
    except Exception as e:
        return jsonify({"message",e})


@app.route('/details', methods=['POST', 'PUT'])
@token_required
def add(user):
    data = request.get_json()
    if not data:
        return jsonify({
            "message": "Please send data",
            "error": "Bad request"
        }), 400
    elif(len(data)!=6):
        return jsonify({
            'message':'Please send all the required data',
            'error':'bad request'
        }),400
    if request.method == 'POST':
        try:
            date = datetime.now()
            cursor.execute('insert into details(firstName,lastName,mobile,email,dateOfBirth,address,createDate,updateDate,username) values (%s,%s,%s,%s,%s,%s,%s,%s,%s)',
                           [data['firstName'], data['lastName'], data['mobile'], data['email'], data['dateOfBirth'], data['address'], date, date, user])
            con.commit()
            return jsonify({"message": "Detail added sucessfully"}), 200
        except Exception as e:
            return jsonify({"message": "Email already exist"}), 409
    elif request.method == 'PUT':
        try:
            date = datetime.now()
            cursor.execute(
                'UPDATE details SET firstName=%s, lastName=%s, mobile=%s, dateOfBirth=%s, address=%s, updateDate=%s, email=%s WHERE email=%s',
                (data['firstName'], data['lastName'], data['mobile'],
                 data['dateOfBirth'], data['address'], date, data['email'], data['key'])
            )
            con.commit()
            return jsonify({"message": "Edited sucessfully"})
        except Exception as e:
            return Response("Error :", e)


@app.route('/delete/<mail>', methods=['DELETE'])
@token_required
def delete(user,mail):
    try:
        cursor.execute('delete from details where email=%s', [mail])
        con.commit()
        return jsonify({"message": "Deleted Sucessfully"})
    except Exception as e:
        return Response("Error :", e)


if __name__ == '__main__':
    app.run(debug=True)
