var mails = Array()
var mailFlag = true

function loader() {
    if (sessionStorage.getItem('key') == 'edit') {
        document.getElementById('txt').innerHTML = 'EDIT DETAILS'
        document.getElementById('firstName').value = sessionStorage.getItem('fname')
        document.getElementById('lastName').value = sessionStorage.getItem('lname')
        document.getElementById('email').value = sessionStorage.getItem('email')
        document.getElementById('mobile').value = sessionStorage.getItem('mob')
        document.getElementById('address').value = sessionStorage.getItem('address')
        document.getElementById('dateOfBirth').value = sessionStorage.getItem('dob')
        document.getElementById('email').setAttribute('disabled', true)
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('dateOfBirth').setAttribute('max', String(today))
        getmails()
    } else {
        document.getElementById('txt').innerHTML = 'ADD DETAILS'
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('dateOfBirth').setAttribute('max', String(today))
    }
}


async function getmails() {

    const resp = await fetch('http://localhost:5000/mails')
    const data = await resp.json()
    data.map((m) => {
        mails.push(m['email'][0])
        ms+=","+m['email'][0]
    })
    ms=ms.split(',')
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
        const em = []
        mails.map((m) => {
            em.push(m);
        })
        let email = document.getElementById('email').value;
        for (let i = 0; i < em.length; i++) {
            if (email == em[i]) {
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
        if (/^[a-z]+[0-9._-]+@[a-z.-]+\.[a-z]{2,63}$/.test(mail) || /^[a-z]+@[a-z.-]+\.[a-z]{2,63}$/.test(mail)) {
            return true
        } else {
            return false
        }
    } else {
        if (/^[a-z]+[0-9._-]+@[a-z.-]+\.[a-z]{2,63}$/.test(document.getElementById('email').value) || /^[a-z]+@[a-z.-]+\.[a-z]{2,63}$/.test(document.getElementById('email').value)) {
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
function check() {
    if (document.getElementById('firstName').value == "") {
        alert("Please fill in first name")
        return false
    } else if (document.getElementById('email').value == "") {
        alert("Please fill in email")
        return false
    } else if (document.getElementById('mobile').value == "") {
        alert("Please fill in mobile number")
        return false
    } else if (document.getElementById('address').value == "") {
        alert("Please fill in address")
        return false
    } else if (document.getElementById('dateOfBirth').value == "") {
        alert("Please select a date")
        return false
    } else if (fname() || lname()) {
        alert("Please check first or last name")
        return false
    }


    if (sessionStorage.getItem('key') == 'register') {
        if (mail()) {
            getmails()
            if (mailFlag) {
                return false
            } else {
                addDetail()
            }
        } else {
            return false
        }
    } else {
        editDetail()
        return true
    }
}


const editDetail = async () => {
    const response = await fetch('http://localhost:5000/details', {
        method: 'PUT',
        body: JSON.stringify({
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            mobile: document.getElementById('mobile').value,
            email: document.getElementById('email').value,
            dateOfBirth: document.getElementById('dateOfBirth').value,
            address: document.getElementById('address').value,
            key: sessionStorage.getItem('email')
        }),
        headers: {
            'Content-type': 'application/json',
        },
    })
    console.log(response);
}



function mobileCheck(mob) {
    if (mob) {
        if (mob > 9999999999) {
            mob = ("" + mob).substring(0, 10);
            return mob
        }
    } else {
        let num = document.getElementById('mobile').value
        if (num > 9999999999) {
            num = ("" + num).substring(0, 10);
            document.getElementById('mobile').value = num
        }
    }
}





async function addDetail(data) {
    if (data) {
        const response = await fetch('http://localhost:5000/details', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
            },
        })
    } else {
        const response = await fetch('http://localhost:5000/details', {
            method: 'POST',
            body: JSON.stringify({
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                mobile: document.getElementById('mobile').value,
                email: document.getElementById('email').value,
                dateOfBirth: document.getElementById('dateOfBirth').value,
                address: document.getElementById('address').value,
            }),
            headers: {
                'Content-type': 'application/json',
            },
        })
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
    }
} catch {

}