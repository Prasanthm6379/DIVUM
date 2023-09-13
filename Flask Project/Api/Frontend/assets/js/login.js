
function setCookie(name, value, daysToExpire) {
    var cookie = name + "=" + encodeURIComponent(value);
    
    if (daysToExpire) {
        var expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + daysToExpire);
        cookie += "; expires=" + expirationDate.toUTCString();
    }
    
    document.cookie = cookie;
}



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
                let f=result.Result
                if(f){
                    var token = result.access_token;
                    setCookie('access_token',token,1)
                    location.href='index.html'
                }
                else{
                    document.getElementById('alert').style.display='block'
                }
            })
        }
    })
    return false

}