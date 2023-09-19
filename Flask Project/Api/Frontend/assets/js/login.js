
function setCookie(name, value, daysToExpire) {
    var cookie = name + "=" + encodeURIComponent(value);
    document.cookie = cookie;
}



function login() {
    let user = document.getElementById('username').value
    let password = document.getElementById("password").value
    if (user == "") {
        document.getElementById('alert-txt').innerHTML = 'Please fill in username'
        document.getElementById('alert').style.display = 'block'
        return false
    } else if (password == "") {
        document.getElementById('alert-txt').innerHTML = 'Please fill in Password'
        document.getElementById('alert').style.display = 'block'
        return false
    }
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
    }).then((resp) => {
        if (resp.status == 404) {
            resp.json().then((result) => {
                document.getElementById('alert-txt').innerHTML = result.Result
                document.getElementById('alert').style.display = 'block'
                document.getElementById('pass-error').style.display = 'none'
            })
        } else {
            resp.json().then((result) => {
                let f = result.Result
                if (f) {
                    var token = result.access_token;
                    setCookie('access_token', token)
                    document.getElementById('alert').style.display = 'none'
                    document.getElementById('pass-error').style.display = 'none'
                    location.href = 'index.html'
                }
                else {
                    document.getElementById('alert').style.display = 'none'
                    document.getElementById('pass-error').style.display = 'block'
                }
            })
        }
    })
    return false

}