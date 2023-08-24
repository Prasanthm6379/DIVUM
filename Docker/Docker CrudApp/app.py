from flask import Flask,render_template,request
import psycopg2 as psy

con = psy.connect(
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
    cursor.execute('create table if not exists users(userid int primary key,username text,pass text)')
    return render_template('index.html')

    

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/login',methods=['POST','GET'])
def result():
    if request.method=='POST':
        form=request.form
        if form['userid']=="" or form['pass']=="":
            # print( "<script> alert('Please enter all feilds')</script>")
            return render_template('index.html')
        else:
            cursor.execute('select * from users where userid=%s'%form['userid'])
            userdata=cursor.fetchone()
            if userdata:
                if userdata[2]==form['pass']:
                    if form['userid']=='1':
                        cursor.execute('select * from users')
                        rows=cursor.fetchall()
                        return render_template('home.html',data=rows)
                    else:
                        return render_template('guest.html',username=userdata[1])
                else:
                    return render_template('index.html',flag=True)
            else:
                return render_template('index.html',notfound=True)
                
                

@app.route('/newuser', methods=['POST','GET'])
def addNewUser():
    form=request.form
    cursor.execute('create table if not exists users(userid int primary key,username text,pass text)')
    if(form['userid']=="" or form['uname']=="" or form['pass']=="" or form['conpass']==""):
        # return "<h1>Please fill all fealds</h1><a href='http://127.0.0.1:5000/register'>click here to go back!</a>"
        return render_template('register.html')
    elif(form['pass']!=form['conpass']):
        # return "<h1>Password does not match!</h1><a href='http://127.0.0.1:5000/register'>click here to go back!</a>"
        return render_template('register.html')
    else:
        cursor.execute('insert into users(userid,username,pass) values(%s,%s,%s)',[int(form['userid']),form['uname'],form['conpass']])
        con.commit()
        # return "<h1>Register Sucessfull</h1><a href='http://127.0.0.1:5000/'>click here to go back to login!</a>"
        return render_template('index.html')
    
@app.route('/search',methods=['POST','GET'])
def search():
    form=request.form
    if form['search-id']=='' or form['search']=='':
        cursor.execute('select * from users')
        data=cursor.fetchall()
        return render_template('home.html',flag=True,data=data)
    if form['search-id']=='uid':
        cursor.execute('select* from users where userid=%s'%form['search'])
    else:
        cursor.execute("select * from users where username like '%s'"%form['search'])
    row=cursor.fetchall()
    return render_template('home.html',data=row)

@app.route('/reset',methods=['POST','GET'])
def reset():
    cursor.execute('select * from users')
    data=cursor.fetchall()
    return render_template('home.html',data=data)
if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)
