const { describe, test, expect } = require('@jest/globals');
const { checkmail, fname, lname, mail, mobileCheck, addDetail } = require('./regscript');
const { deleteDetail,getapi } = require('./script')
// import {mobileCheck } from './regscript'

// const {mobileCheck}  = require('./regscript');

describe('Unit Testing for RegScript.js', () => {
    test("Check addDetail", () => {
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
    test('Check valid email', () => {
        const validEmail = 'example@domain.com';
        expect(mail(validEmail)).toBeTruthy();
    })
    test('Check invalid email', () => {
        const inValidEmail = 'invalid-email';
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
    test('Check valid firstName', () => {
        const validName = 'name'
        expect(fname(validName)).toBeTruthy()
    })
    test('Check invalid firstName', () => {
        const inValidName = '123name'
        expect(fname(inValidName)).toBeFalsy()
    })
    test('Check valid lastName', () => {
        const validName = 'name'
        expect(lname(validName)).toBeTruthy()
    })
    test('Check invalid lastName', () => {
        const inValidName = '123name'
        expect(lname(inValidName)).toBeFalsy()
    })
    test('Check mobile number trimming', () => {
        const invalidMobile = '1234567890312'
        expect(mobileCheck(invalidMobile)).toBe('1234567890')
    })
}), describe("Unit Testing for script.js", () => {
    test('delete user', () => {
        const mail = 'example@kord.com'
        expect(deleteDetail(mail,"test")).toBeTruthy()
    })
    test("Get api",()=>{
        expect(getapi()).toBeTruthy()
    })
})


