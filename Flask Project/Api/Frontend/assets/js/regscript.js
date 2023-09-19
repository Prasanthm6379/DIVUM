var mails = Array()
var mailFlag = true


function getCookie() {
    var cookies = document.cookie.split(';')
    for(let i=0;i<cookies.length;i++){
        let cookie=cookies[i]
        if(cookie.startsWith(" access")){
            cookie=cookie.slice(1)
        }
        if(cookie.startsWith('access_token=')){
            return cookie.slice(13)
        }
    }
}

function loader() {
    token=getCookie()
    if(!token){
        document.getElementById('popup-content').innerHTML="Request timed out, Click anywhere to return to login"
        document.getElementById('popup').style.display="block"
    }
    if (sessionStorage.getItem('key') == 'edit') {
        document.getElementById('txt').innerHTML = 'EDIT DETAILS'
        document.getElementById('firstName').value = sessionStorage.getItem('fname')
        document.getElementById('lastName').value = sessionStorage.getItem('lname')
        document.getElementById('email').value = sessionStorage.getItem('email')
        document.getElementById('mobile').value = sessionStorage.getItem('mob')
        document.getElementById('address').value = sessionStorage.getItem('address')
        document.getElementById('dateOfBirth').value = sessionStorage.getItem('dob')
        document.getElementById('email').setAttribute('disabled', true)
        document.getElementById('popup-content').innerHTML = "Details edited Sucessfully, Click anywhere to continue!"
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('dateOfBirth').setAttribute('max', String(today))
        getmails()
    } else {
        document.getElementById('txt').innerHTML = 'ADD DETAILS'
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('dateOfBirth').setAttribute('max', String(today))
    }
}

async function addDetail(data) {
        let token=getCookie()
        const response = await fetch('http://localhost:5000/details', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
                'access-token':token,
            },
        })
}


async function getmails() {

    const resp = await fetch('http://localhost:5000/mails')
    const data = await resp.json()
    data.map((m) => {
        mails.push(m['email'][0])
    })
}

function checkmail(data, mail) {
    if (data, mail) {
        for (let i = 0; i < data.length; i++) {
            if (mail == data[i]) {
                return true
            }
        }
        return false

    } else {
        getmails()
        let email = document.getElementById('email').value;
        for (let i = 0; i < mails.length; i++) {
            if (email == mails[i]) {
                document.getElementById('email-exist').style.display = 'block'
                mailFlag = true
                return true
            }
        }
        document.getElementById('email-exist').style.display = 'none'
        mailFlag = false
        return false
    }
}

function mail(mail) {
    if (mail) {
        if (/^[a-z,A-Z,0-9._-]+@[a-z.-]+\.[a-z]{2,63}$/.test(mail)) {
            return true
        } else {
            return false
        }
    } else {
        if (/^[a-z,A-Z,0-9._-]+@[a-z.-]+\.[a-z]{2,63}$/.test(document.getElementById('email').value)) {
            document.getElementById('email-err').style.display = "none"
            return true
        } else {
            document.getElementById('email-err').style.display = "block"
            return false
        }
    }
}


function fname(name) {
    if (name) {
        if (/^[A-Za-z]+$/.test(name)) {
            return true
        } else if (name == "") {
            return false
        } else {
            return false
        }
    } else {
        var txt = document.getElementById('firstName').value
        if (/^[A-Za-z]+$/.test(txt)) {
            document.getElementById('fname-err').style.display = "none"
            return false
        } else if (txt == "") {
            document.getElementById('fname-err').innerHTML = "Please Fill in"
            document.getElementById('fname-err').style.display = "block"
            return true
        } else {
            document.getElementById('fname-err').innerHTML = "Please enter only alphabets"
            document.getElementById('fname-err').style.display = "block"
            return true
        }
    }
}

function lname(name) {
    if (name) {
        if (/^[A-Za-z]+$/.test(name)) {
            return true
        } else if (name == "") {
            return false
        } else {
            return false
        }
    } else {
        var txt = document.getElementById('lastName').value
        if (/^[A-Za-z]+$/.test(txt)) {
            document.getElementById('lname-err').style.display = "none"
            return false
        } else if (txt == "") {
            document.getElementById('lname-err').innerHTML = "Please Fill in"
            document.getElementById('lname-err').style.display = "block"
            return true
        } else {
            document.getElementById('lname-err').innerHTML = "Please enter only alphabets"
            document.getElementById('lname-err').style.display = "block"
            return true
        }
    }
}

async function editDetail(data) {
    let token=getCookie()
    const response = await fetch('http://localhost:5000/details', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
            'access-token':token,
        },
    })
    return true
}


function mobileCheck(mob) {
    if (mob) {
        if (mob > 9999999999) {
            mob = ("" + mob).substring(0, 10);
            return mob
        }
    } else {
        let num = document.getElementById('mobile').value
        if (num<6){
            document.getElementById('mob-err').innerHTML="Enter a valid mobile number"
            document.getElementById('mob-err').style.display='block'
            document.getElementById('mobile').value = ''
        }else{
            if (num > 9999999999) {
                num = ("" + num).substring(0, 10);
                document.getElementById('mob-err').innerHTML="Mobile number cannot exceed 10 digits"
                document.getElementById('mob-err').style.display='block'
                document.getElementById('mobile').value = num
            }else{
                document.getElementById('mob-err').style.display='none'
            }
        }
    }
}



function check() {
    let alertbox = document.getElementById('alert')
    let alert = document.getElementById('err-txt')
    if (document.getElementById('firstName').value == "") {
        alertbox.style.display = 'block'
        alert.innerHTML = "Please fill in First name "
        return false
    } else if (document.getElementById('lastName').value == "") {
        alertbox.style.display = 'block'
        alert.innerHTML = "Please fill in Last name "
        return false
    } else if (document.getElementById('email').value == "") {
        alertbox.style.display = 'block'
        alert.innerHTML = "Please fill in Email"
        return false
    } else if (document.getElementById('mobile').value == "") {
        alertbox.style.display = 'block'
        alert.innerHTML = "Please fill in Mobile number"
        return false
    } else if (document.getElementById('address').value == "") {
        alertbox.style.display = 'block'
        alert.innerHTML = "Please fill in Address"
        return false
    } else if (document.getElementById('dateOfBirth').value == "") {
        alertbox.style.display = 'block'
        alert.innerHTML = "Please enter a valid date"
        return false
    } else if (fname() || lname()) {
        alertbox.style.display = 'block'
        alert.innerHTML = "Enter only alphabets in Firstname and Lastname"
        return false
    } else if (document.getElementById('mobile').value.length != 10) {
        alertbox.style.display = 'block'
        alert.innerHTML = "Enter a valid 10 digit mobile number"
        return false
    }


    if (sessionStorage.getItem('key') == 'register') {
        if (mail()) {
            getmails()
            if (mailFlag) {
                return false
            } else {
                let data={
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    mobile: document.getElementById('mobile').value,
                    email: document.getElementById('email').value,
                    dateOfBirth: document.getElementById('dateOfBirth').value,
                    address: document.getElementById('address').value,
                }
                addDetail(data)
                document.getElementById('alert').style.display = "none"
                document.getElementById('popup').style.display = 'block'
                return false
            }
        } else {
            return false
        }
    } else {
        console.log("edit");
        let data = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            mobile: document.getElementById('mobile').value,
            email: document.getElementById('email').value,
            dateOfBirth: document.getElementById('dateOfBirth').value,
            address: document.getElementById('address').value,
            key: sessionStorage.getItem('email')
        }
        editDetail(data)
        document.getElementById('alert').style.display="none"
        document.getElementById('popup').style.display = 'block'
        return false
    }
}
















try {
    module.exports = {
        checkmail,
        fname,
        lname,
        mail,
        mobileCheck,
        addDetail,
        editDetail,
    }
} catch {

}