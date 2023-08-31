from flask import Flask,request,render_template,redirect
import psycopg2 as psy
import datetime 
from datetime import datetime

con=psy.connect(
    database="Divum",
    user="postgres",
    password="123",
    host="localhost",
    port='5432'
)

cursor=con.cursor()
app=Flask(__name__,template_folder='templates')



@app.route('/')
def home():
    cursor.execute('select email,firstName,lastName,mobile,address from details')
    data=cursor.fetchall()
    return render_template('index.html',data=data)

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/newData',methods=['POST','PUT'])
def addUser():
    if request.method=='POST':
        form=request.form
        date=datetime.now()
        date=str(date.year)+"-"+str(date.month)+"-"+str(date.day)
        cursor.execute('insert into details(firstName,lastName,mobile,email,dateOfBirth,address,createDate,updateDate) values (%s,%s,%s,%s,%s,%s,%s,%s)',[form['firstName'],form['lastName'],form['mob'],form['email'],form['dob'],form['address'],date,date])
        con.commit()
        return redirect('/')
    elif request.method == 'PUT':
        form = request.form
        date = datetime.now()
        formatted_date = f"{date.year}-{date.month}-{date.day}"
        cursor.execute(
            'UPDATE details SET firstName=%s, lastName=%s, mobile=%s, dateOfBirth=%s, address=%s, updateDate=%s WHERE email=%s',
            (form['firstName'], form['lastName'], form['mob'], form['dob'], form['address'], formatted_date, form['email'])
        )
        con.commit()
        return redirect('/')


@app.route('/edit/<mail>')
def edit(mail):
    cursor.execute('select firstName,lastName,email,mobile,address,dateOfBirth from details where email=%s',[mail])
    data=cursor.fetchone()
    # data=str(data)
    return render_template('edit.html',fname=data[0],lname=data[1],email=data[2],mobile=data[3],addr=data[4],dob=data[5])


if __name__=='__main__':
    app.run(debug=True,port='5002')