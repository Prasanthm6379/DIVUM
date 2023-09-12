const { describe, test, expect } = require('@jest/globals');
const { checkmail, fname, lname, mail, mobileCheck, addDetail,editDetail  } = require('./regscript');
const { deleteDetail,getapi } = require('./script')
// import {mobileCheck } from './regscript'

// const {mobileCheck}  = require('./regscript');

describe('Unit Testing for RegScript.js', () => {
    test("Check add Detail", () => {
        data =
        {
            "dateOfBirth": "2002-09-12",
            "email": "example@kord.com",
            "firstName": "Allwin",
            "lastName": "Kord",
            "mobile": "8374982374",
            "address": "Coonoor"
        }
        expect(addDetail(data)).toBeTruthy()
    })
    test("Check edit Detail", () => {
        data =
        {
            "dateOfBirth": "2002-09-12",
            "email": "example@kord.com",
            "firstName": "AllwinEdited",
            "lastName": "Kord",
            "mobile": "8374982374",
            "address": "Coonoor"
        }
        expect(editDetail(data)).toBeTruthy()
    })
    test('Check valid email : example@domain.com', () => {
        const validEmail = 'example@domain.com';
        expect(mail(validEmail)).toBeTruthy();
    })
    test('Check valid email : asd123@gmail.com', () => {
        const validEmail = 'asd123@gmail.com';
        expect(mail(validEmail)).toBeTruthy();
    })
    test('Check invalid email : invalid-email', () => {
        const inValidEmail = 'invalid-email';
        expect(mail(inValidEmail)).toBeFalsy();
    })
    test('Check Valid email : 123@asd.com', () => {
        const inValidEmail = '123@asd.com';
        expect(mail(inValidEmail)).toBeTruthy();
    })
    test('Check invalid email : abc@ac.i', () => {
        const inValidEmail = 'abc@ac.i';
        expect(mail(inValidEmail)).toBeFalsy();
    })
    test('Check invalid email : name.in', () => {
        const inValidEmail = 'name.in';
        expect(mail(inValidEmail)).toBeFalsy();
    })
    test('Check existing email', () => {
        const data = ['example@domain.com'];
        const email = 'example@domain.com'
        expect(checkmail(data, email)).toBeTruthy()
    })
    test('Check non-existing email', () => {
        const data = [{ 'email': 'example@domain.com' }];
        const email = 'non@existing.mail'
        expect(checkmail(data, email)).toBeFalsy()
    })
    test('Check valid firstName : name', () => {
        const validName = 'name'
        expect(fname(validName)).toBeTruthy()
    })
    test('Check valid firstName : Name', () => {
        const validName = 'Name'
        expect(fname(validName)).toBeTruthy()
    })

    test('Check invalid firstName : 123name', () => {
        const inValidName = '123name'
        expect(fname(inValidName)).toBeFalsy()
    })
    test('Check valid lastName : name', () => {
        const validName = 'name'
        expect(lname(validName)).toBeTruthy()
    })
    test('Check valid lastName : Name', () => {
        const validName = 'Name'
        expect(lname(validName)).toBeTruthy()
    })
    test('Check invalid lastName : 123name', () => {
        const inValidName = '123name'
        expect(lname(inValidName)).toBeFalsy()
    })
    test('Check mobile number trimming : 123456789031212387216', () => {
        const invalidMobile = '123456789031212387216'
        expect(mobileCheck(invalidMobile)).toBe('1234567890')
    })
}), describe("Unit Testing for script.js", () => {
    test('Check delete user', () => {
        const mail = 'example@kord.com'
        expect(deleteDetail(mail,"test")).toBeTruthy()
    })
    test("Check Get api",()=>{
        expect(getapi("test")).toBeTruthy()
    })
})