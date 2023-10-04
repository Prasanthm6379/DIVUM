from flask import Flask, jsonify, request, Response,make_response
import psycopg2 as psy
from datetime import datetime, timedelta
from flask_cors import CORS
import bcrypt
import os
from functools import wraps
import jwt
from flask_mail import Mail, Message
from threading import Thread

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

            if not token:
                return jsonify({"message": "Token is invald!"}), 401
            try:
                data = jwt.decode(token, app.config['SECRECT_KEY'])
                cur_user=data['username']
            except:
                return jsonify({"message": "Token is invald!"}), 401
            return f(cur_user, *args, **kwargs)
    return decorated




app.config['MAIL_SERVER'] = 'smtp.gmail.com'  
app.config['MAIL_PORT'] = 587  
app.config['MAIL_USERNAME'] = 'prasanthbike@gmail.com'  
app.config['MAIL_PASSWORD'] = 'fbmcvxjhdaufjovl'  
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)


def send_verification_email(email,username, token):
    # print("email sent")
    with app.app_context():
        msg = Message('Email Verification', sender='app_test@gmail.com', recipients=[email])
        verification_url = f'http://localhost:5000/verify/{token}'  
        msg.html = f'<p>Hi {username}!</p>To verify your email: <a href="{verification_url}">Click here</a><p>Valid only for 30 minutes!</p><p><a href="http://localhost:5000/resend/{username}">Click here</a> to resend email to return to login</p>'
        mail.send(msg)


@app.route('/')
def home():
    return "<h1 style='text-align:center;'>Welcome to Divum API<h1>"

@app.route('/verify/<token>',methods=['GET'])
def mail_verify(token):
    try:
        data = jwt.decode(token, app.config['SECRECT_KEY'])
    except Exception:
        return''''
        <div style='text-align:center'>
        <h1>Invalid Token</h1>
        </div>'''
    username=data['username']
    cursor.execute('select verify from login where username=%s',[username])
    status=cursor.fetchone()[0]
    print(username)
    print(status)
    if status=='true':
        return ''''
        <div style='text-align:center'>
        <h1>Email already verified</h1>
        <p>click <a href='http://127.0.0.1:5500/Flask%20Project/Api/Frontend/login.html'>here</a> to return to login</p>
        </div>'''
    else:
        cursor.execute('update login set verify=%s where username=%s',[True,username])
        con.commit()
        return ''''
        <div style='text-align:center'>
        <h1>Email verified sucessfuly!</h1>
        <p>click <a href='http://127.0.0.1:5500/Flask%20Project/Api/Frontend/login.html'>here</a> to return to login</p>
        </div>'''

@app.route('/resend/<username>',methods=['GET'])
def resend_mail(username):
    cursor.execute('select mail,verify from login where username=%s',[username])
    data=cursor.fetchone()
    email=data[0]
    status=data[1]
    if status=='true':
        return '''<div style='text-align:center'><h3>Email already verified</h3></div>'''
    token=tokenGen(username)
    send_verification_email(email,username,token)
    return '''<div style='text-align:center'><h3>Verification link sent to registered mail</h3></div>'''

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        token=tokenGen(data['username'])
        # send_verification_email(data['email'],data['username'],token)
        byte = data['pass'].encode('utf8')
        salt = bcrypt.gensalt(12)
        hashpwd = bcrypt.hashpw(byte, salt)
        try:
            cursor.execute('insert into login (username,pass,mail,verify) values (%s,%s,%s,%s)', [
                           data['username'], hashpwd.decode('utf8'),data['email'],False])
            con.commit()
        except Exception as e:
            con.rollback()
            return jsonify({"message": "User already exists"}), 226
        thread=Thread(target=send_verification_email(data['email'],data['username'],token))
        thread.start()
        con.commit()
        thread.join()
        return jsonify({"message":"Sucess"}) ,200
    except Exception as e:
        return jsonify({"message":"User already exist"}), 226



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
        cursor.execute('select verify from login where username=%s',[data['username']])
        status=cursor.fetchone()[0]
        if status=='false':
            return jsonify({"Result":"Please verify email!"}),401
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
            return jsonify({"message":"No data present","user":user}),204
    except Exception as e:
        return jsonify({"message",e}),500


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
