import psycopg2 as psy
con=psy.connect(
    database="Employee",
    user="postgres",
    password="123",
    host="localhost",
    port='5432'
)

cursor_obj=con.cursor()
cursor_obj.execute("select * from employee")
result=cursor_obj.fetchall()
print("\nResult set:\n",result)