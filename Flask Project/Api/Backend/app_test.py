import unittest
import json
from app import app

class TestApp(unittest.TestCase):
    def setUp(self):
        app.testing=True
        self.app=app.test_client()

    def test_validLogin(self):
        data={
            'username':'user',
            "pass":"pass"
        }
        resp=self.app.post('/login',json=data)
        self.assertEqual(resp.json['Result'],True)

    def test_unautorizedRequest(self):
        resp=self.app.get('/getDetails')
        self.assertEqual(resp.status_code,401)


    def test_getUsers(self):
        resp=self.app.get('/getDetails',headers={'test':'test'})
    
    def test_addUser(self):
        data={
             "firstName": "example",
            "lastName": "changedExample",
            "email": "example@domain.com",
            "mobile": "8899887767",
            "dateOfBirth": "1990-01-01",
            "address": "123,cbe"
        }
        resp=self.app.post('/details',json=data,headers={'test':'test'})
        self.assertEqual(resp.status_code,200)
    
    def test_invalidAddUser(self):
        data={}
        resp=self.app.post('details',json=data,headers={'test':'test'})
        self.assertEqual(resp.status_code,400)

    def test_getone(self):
        resp=self.app.get('/getone/prasanth@gmail.com')
        data=json.loads(resp.data)
        self.assertEqual(resp.status_code,200)

    def test_invalidLogin(self):
        data={
            'username':'user',
            "pass":"pass123"
        }
        resp=self.app.post('/login',json=data)
        self.assertEqual(resp.json['Result'],False)
    
    

    def test_editDetails(self):
        data={
            "firstName": "example",
            "lastName": "changedExample",
            "email": "example@domain.com",
            "mobile": "8899887767",
            "key": "example@domain.com",
            "dateOfBirth": "1990-01-01",
            "address": "123,cbe"
        }
        resp=self.app.put('/details',json=data,headers={'test':'test'})
        # print(token,"token")
        self.assertEqual(resp.status_code,200)
    
    def test_mails(self):
        resp=self.app.get('/mails')
        data=json.loads(resp.data)
        self.assertEqual(resp.status_code,200)

    
    def test_delete(self):
        resp=self.app.delete('/delete/example@domain.com',headers={'test':'test'})
        self.assertEqual(resp.status_code,200)

if __name__=='__main__':
    unittest.main()