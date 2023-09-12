
let f = false

function login() {
    var data = {
        username: document.getElementById('username').value,
        pass: document.getElementById('password').value
    }
    fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
        },
    }).then((resp)=>{
        if(resp.status==404){
            document.getElementById('alert').style.display='block'
        }else{
            resp.json().then((result)=>{
                f=result[0].Result
                if(f){
                    location.href='index.html'
                }
                else{
                    document.getElementById('alert').style.display='block'
                }
            })
        }
    })
    if(f){
        return true
    }else{
        return false
    }
}