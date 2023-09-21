


async function addUser(data) {
    let rep = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
        },
    })
    if(rep.status==409){
        document.getElementById('err-txt').innerHTML="User already exists!"
        document.getElementById('alert').style.display="block"
    }else{
        document.getElementById('alert').style.display="none"
        document.getElementById('popup').style.display="block"
    }
}


function signup() {
    let uname = document.getElementById('uname').value
    let password = document.getElementById('pass').value
    let cpass = document.getElementById('cpass').value
    let mail = document.getElementById('email').value
    if(uname==""){
        document.getElementById('err-txt').innerHTML="Fill in Username!"
        document.getElementById('alert').style.display="block"
        return false
    }else if(password==""){
        document.getElementById('err-txt').innerHTML="Fill in password!"
        document.getElementById('alert').style.display="block"
        return false
    }else if(cpass==""){
        document.getElementById('err-txt').innerHTML="Fill in confirm password!"
        document.getElementById('alert').style.display="block"
        return false
    }else if(mail==""){
        document.getElementById('err-txt').innerHTML="Fill in Email!"
        document.getElementById('alert').style.display="block"
        return false
    }else if(!(/^[a-z,A-Z,0-9._-]+@[a-z.-]+\.[a-z]{2,63}$/.test(mail))){
        console.log("invalid");
        document.getElementById('err-txt').innerHTML="Please enter a valid email!"
        document.getElementById('alert').style.display="block"
        return false
    }
    if (password === cpass) {
        data = {
            username: uname,
            pass: password,
            email:mail
        }
        addUser(data)
        return false
    } else {
        document.getElementById('err-txt').innerHTML="Password does not match"
        document.getElementById('alert').style.display="block"
        return false
    }
}