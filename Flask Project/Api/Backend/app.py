from flask import Flask , jsonify , request ,Response
import psycopg2 as psy
from datetime import datetime
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app,origins="*")

con = psy.connect(
    database="Divum",
    user="postgres",
    password="123",
    host="localhost",
    port='5432'
)

cursor = con.cursor()

@app.route('/getone/<mail>',methods=['GET'])
def getOne(mail):
    cursor.execute('select email,firstName,lastName,mobile,address,dateOfBirth from details where email=%s',[mail])
    data=cursor.fetchall()
    # 25-01-2002
    # print(data)
    return jsonify(data,200)


@app.route('/mails',methods=['GET'])
def mails():
    cursor.execute('select email from details')
    data=cursor.fetchall()
    try:
        res=[]
        for mail in data:
            res.append({
                'email':mail
            })
        return jsonify(res)
    except Exception as e:
        return Response("Error: ",e)


@app.route('/getDetails',methods=['GET'])
def getAll():
    try:
        cursor.execute('select email,firstName,lastName,mobile,dateOfBirth from details order by updateDate desc limit 10')
        data=cursor.fetchall()
        if data:
            res=[]
            for user in data:
                res.append({
                    'email':user[0],
                    'firstName':user[1],
                    'lastName':user[2],
                    'mobile':user[3],
                    'dateOfBirth':user[4]
                })
            return jsonify(res)
        else:
            return Response("No data Present",204)
    except Exception as e:
        return Response("Error: ",e)
    

@app.route('/details',methods=['POST','PUT'])
def add():
    if request.method=='POST':
        try:
            data=request.get_json()
            # print(data)
            date=datetime.now()
            # date=str(date.year)+"-"+str(date.month)+"-"+str(date.day)
            # dob=data['dateOfBirth'][8:10]+"-"+data['dateOfBirth'][5:7]+"-"+data['dateOfBirth'][0:4]
            # print(dob)
            cursor.execute('insert into details(firstName,lastName,mobile,email,dateOfBirth,address,createDate,updateDate) values (%s,%s,%s,%s,%s,%s,%s,%s)',
                        [data['firstName'],data['lastName'],data['mobile'],data['email'],data['dateOfBirth'],data['address'],date,date])
            con.commit()
            return Response("success",200)
        except Exception as e:
            return Response("Error: "+e)
    elif request.method=='PUT':
        try:
            data=request.get_json()
            date=datetime.now()
            # date=str(date.year)+"-"+str(date.month)+"-"+str(date.day
            # dob=data['dateOfBirth'][8:10]+"-"+data['dateOfBirth'][5:7]+"-"+data['dateOfBirth'][0:4]

            cursor.execute(
                'UPDATE details SET firstName=%s, lastName=%s, mobile=%s, dateOfBirth=%s, address=%s, updateDate=%s, email=%s WHERE email=%s',
                (data['firstName'], data['lastName'], data['mobile'],data['dateOfBirth'], data['address'], date, data['email'],data['key'])
            )
            con.commit()
            return Response("Edited Sucessfully",200)
        except Exception as e:
            return Response("Error :",e)
    
    
@app.route('/delete/<mail>',methods=['DELETE'])
def delete(mail):
    try:
        cursor.execute('delete from details where email=%s',[mail])
        con.commit()
        return "Deleted Sucessfully"
    except Exception as e:
        return Response("Error :",e)
if __name__ == '__main__':
    app.run(debug=True, port='5000')
