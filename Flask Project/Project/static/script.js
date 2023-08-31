
const today = new Date().toISOString().split('T')[0];
document.getElementById('dob').setAttribute('max', today);

function mail(){
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(document.getElementById('email').value)){
        document.getElementById('email-err').style.display="none"
    }else{
        document.getElementById('email-err').style.display="block"

    }
}
function fname(){
    var txt=document.getElementById('firstName').value
    if(/^[A-Za-z]+$/.test(txt)){
        document.getElementById('fname-err').style.display="none"
    }else{
        document.getElementById('fname-err').style.display="block"
    }
}

function lname(){
    var txt=document.getElementById('lastName').value
    if(/^[A-Za-z]+$/.test(txt)){
        document.getElementById('lname-err').style.display="none"
    }else{
        alert("Please enter only Alphabets")
        document.getElementById('lname-err').style.display="block"
    }
}
function check(){
    fname()
    lname()
    mail()
    if(document.getElementById('firstName').value==""){
        alert("Please fill in first name")
        return false
    }else if(document.getElementById('email').value==""){
        alert("Please fill in email")
        return false
    }else if(document.getElementById('mob').value==""){
        alert("Please fill in mobile number")
        return false
    }else if(document.getElementById('address').value==""){
        alert("Please fill in address")
        return false
    }else if(document.getElementById('dob').value==""){
        alert("Please select a date")
        return false
    }else if(document.getElementById('mob').value.length!=10){
        alert('invalid mobile num')
        return false
    }
}