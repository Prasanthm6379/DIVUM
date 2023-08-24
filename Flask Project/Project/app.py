from flask import Flask,request,render_template
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
def home():
    return render_template('index.html')



if __name__=='__main__':
    app.run(debug=True)