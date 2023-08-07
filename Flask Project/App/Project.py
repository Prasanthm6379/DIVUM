from flask import Flask,redirect,url_for,request,render_template
import psycopg2 as psy
con=psy.connect(
    database="FlaskProject",
    user="postgres",
    password="123",
    host="localhost",
    port='5432'
)
cursor=con.cursor()
app=Flask(__name__,template_folder='templates')

@app.route('/')
def generate():
    return render_template('index.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/login',methods=['POST','GET'])
def result():
    if request.method=='POST':
        form=request.form
        if form['userid']=="" or form['pass']=="":
            return render_template('failure.html')
        else:
            cursor.execute("select * from users where (userid=%s)"%int(form['userid']))
            row=cursor.fetchone()
            if row:
                cursor.execute("select * from users")
                rows=cursor.fetchall()
                return render_template('home.html',data=[row,rows])
            else:
                return render_template('failure.html')
                

@app.route('/newuser', methods=['POST','GET'])
def addNewUser():
    form=request.form
    if(form['userid']=="" or form['uname']=="" or form['pass']=="" or form['conpass']==""):
        return "<h1>Please fill all fealds</h1><a href='http://127.0.0.1:5000/register'>click here to go back!</a>"
    elif(form['pass']!=form['conpass']):
        return "<h1>Password does not match!</h1><a href='http://127.0.0.1:5000/register'>click here to go back!</a>"
    else:
        cursor.execute('insert into users(userid,username,pass) values(%s,%s,%s)',[int(form['userid']),form['uname'],form['conpass']])
        con.commit()
        return "<h1>Register Sucessfull</h1><a href='http://127.0.0.1:5000/'>click here to go back to login!</a>"
if __name__=='__main__':
    app.run(debug=True)