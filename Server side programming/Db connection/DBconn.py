import psycopg2 as psy
con=psy.connect(
    database="Employee",
    user="postgres",
    password="123",
    host="localhost",
    port='5432'
)
b=True
cursor_obj=con.cursor()

def insert():
    id=int(input("Enter the id: "))
    name=input("Enter the name: ")
    salary=int(input("Enter the salary: "))
    loc=input("Enter the location: ")
    cursor_obj.execute("insert into employee(id,ename,salary,eaddress) values (%s,%s,%s,%s)",(id,name,salary,loc))
    print("\nInsert Sucessfull")
    con.commit()

def delete():
    id=int(input("Enter the id to be deleted: "))
    cursor_obj.execute("delete from employee where id= %s",(id, ))
    print("\nDeleted sucussfully")
    con.commit()

def display():
    cursor_obj.execute("select * from employee")
    result=cursor_obj.fetchall()
    for row in result:
        print("+-----------------+")
        print("ID:",row[0])
        print("NAME:",row[1])
        print("SALARY:",row[2])
        print("LOCATION:",row[3])
        print("+-----------------+")

while(b):
    print('''
          +--------MENU--------+\n
          | 1.Insert record    |\n
          | 2.Delete record    |\n
          | 3.Display table    |\n
          | 4.Exit             |\n
          +--------------------+\n''')
    choice=int(input())
    if(choice==1):
        insert()
    elif(choice==2):
        delete()
    elif(choice==3):
        display()
    elif(choice==4):
        b=False
        cursor_obj.close()
        con.close()
    else:
        print("Enter a valid choice!")