const today = new Date().toISOString().split('T')[0];
document.getElementById('dateOfBirth').setAttribute('max', String(today))



if (sessionStorage.getItem('key') == 'edit') {
    document.getElementById('txt').innerHTML = 'EDIT DETAILS'
    document.getElementById('firstName').value = sessionStorage.getItem('fname')
    document.getElementById('lastName').value = sessionStorage.getItem('lname')
    document.getElementById('email').value = sessionStorage.getItem('email')
    document.getElementById('mobile').value = sessionStorage.getItem('mob')
    document.getElementById('address').value = sessionStorage.getItem('address')
    document.getElementById('dateOfBirth').value = sessionStorage.getItem('dob')
    document.getElementById('email').setAttribute('disabled', true)
} else {
    document.getElementById('txt').innerHTML = 'ADD DETAILS'
}
function mail() {
    if (/^[a-z]+[0-9._-]+@[a-z.-]+\.[a-z]{2,63}$/.test(document.getElementById('email').value) || /^[a-z]+@[a-z.-]+\.[a-z]{2,63}$/.test(document.getElementById('email').value)) {
        document.getElementById('email-err').style.display = "none"
        getmails()
        return false
    } else {
        document.getElementById('email-err').style.display = "block"
        getmails()
        return true
    }
}
function checkmail(data) {
    let email=document.getElementById('email').value

    data.map((m)=>{
        if(m['email'][0]==email){
            document.getElementById('email-exist').style.display='block'
            document.getElementById('email').value=""
            return true
        }else{
            document.getElementById('email-exist').style.display='none'
            return false
        }
    })
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

function lname() {
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
    } else if (document.getElementById('mobile').value.length != 10) {
        alert('Enter 10 digit mobile number')
        return false
    } else if (fname() || lname()) {
        alert("Please check first and last name")
        return false
    } else if (mail()) {
        alert("Please enter valid email.")
        return false
    }
    if (sessionStorage.getItem('key') == 'register') {
        addDetail()
    } else {
        editDetail()
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



function mobileCheck() {
    let num = document.getElementById('mobile').value
    if (num > 9999999999){
        num=(""+num).substring(0,10);
        document.getElementById('mobile').value=num
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


