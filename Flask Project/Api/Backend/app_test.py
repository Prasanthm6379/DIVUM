import unittest
import json
from app import app


class TestApp(unittest.TestCase):
    def setUp(self):
        app.testing=True
        self.app=app.test_client()



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
        resp=self.app.put('/details',json=data)
        self.assertEqual(resp.status_code,200)
    
    def test_mails(self):
        resp=self.app.get('/mails')
        data=json.loads(resp.data)
        self.assertEqual(resp.status_code,200)

    def test_getone(self):
        resp=self.app.get('/getone/example@domain.com')
        data=json.loads(resp.data)
        self.assertEqual(resp.status_code,200)
    
    def test_delete(self):
        resp=self.app.delete('/delete/example@domain.com')
        self.assertEqual(resp.status_code,200)

if __name__=='__main__':
    unittest.main()