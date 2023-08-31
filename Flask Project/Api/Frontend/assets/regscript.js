import { myvar } from "./script";

console.log(myvar);

const today = new Date().toISOString().split('T')[0];
document.getElementById('dateOfBirth').setAttribute('max', String(today))

function mail() {
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(document.getElementById('email').value)) {
        document.getElementById('email-err').style.display = "none"
    } else {
        document.getElementById('email-err').style.display = "block"

    }
    getmails()
}
function checkmail(data) {
    for (let i = 0; i < data.length; i++) {
        let row = data[i]
        // console.log(row['email'][0])
        if (String(row['email'][0]) == String(document.getElementById('email').value)) {
            // console.log('work')
            document.getElementById('email-exist').style.display = 'block'
            document.getElementById('email').value = ""
            return false
        } else {
            // console.log(row['email'][0] + "<->" + document.getElementById('email').value)
            document.getElementById('email-exist').style.display = 'none'
        }
    }
}
async function getmails() {
    const response = await fetch('http://localhost:5000/mails');
    var data = await response.json();
    checkmail(data);
}
function fname() {
    var txt = document.getElementById('firstName').value
    if (/^[A-Za-z]+$/.test(txt)) {
        document.getElementById('fname-err').style.display = "none"
    } else if (document.getElementById('firstName').value == "") {
        document.getElementById('fname-err').innerHTML = "Please Fill in"
        document.getElementById('fname-err').style.display = "block"
    } else {
        document.getElementById('fname-err').innerHTML = "Please enter only alphabets"
        document.getElementById('fname-err').style.display = "block"
    }
    let data = document.getElementById('userForm')
    let fd = new FormData(data)
    // console.log(fd[0])

}

function lname() {
    var txt = document.getElementById('lastName').value
    if (/^[A-Za-z]+$/.test(txt)) {
        document.getElementById('lname-err').style.display = "none"
    } else {
        document.getElementById('lname-err').style.display = "block"
    }
}
function check() {
    fname()
    lname()
    mail()
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
    } else if (document.getElementById('mobile').value.length != 10) {
        alert('invalid mobile num')
        return false
    }
    addDetail()
}


function mobile() {
    if (document.getElementById('mobile').value.length != 10) {
        document.getElementById('mob-err').style.display = 'block'
    } else {
        document.getElementById('mob-err').style.display = 'none'
    }
}
const addDetail = async () => {
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
    console.log(response);
}


