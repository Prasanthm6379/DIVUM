async function getapi() {
    let url = "http://127.0.0.1:5000/getDetails"
    const response = await fetch(url);
    if(response.status==204){
        document.getElementById('table-body').innerHTML=`<tr><td></td><td></td><td>NO</td><td>DATA</td><td></td><td></td><tr>`
    }else if(response.status==200){
        var data = await response.json();
        show(data);
    }
    return true
}
function show(data) {
    let tabrow = ``;
    for (let i = 0; i < data.length; i++) {
        let info = data[i];
        let dob=info['dateOfBirth']
        dob=dob.slice(8,10)+'-'+dob.slice(5,7)+'-'+dob.slice(0,4)
        tabrow +=
            `<tr>
        <td>${info["email"]}</td>
        <td>${info["firstName"]}</td>
        <td>${info["lastName"]}</td>
        <td>${info["mobile"]}</td>
        <td>${dob}</td>
        <td>
        <button class='action-buttons' onclick='edit("${info['email']}")' >EDIT</button>
        <button class='action-buttons' onclick='deleteDetail("${info['email']}")'>DELETE</button>
        </td>
        </tr>`;
    }
    document.getElementById("table-body").innerHTML = tabrow;
}
function register(){
    sessionStorage.setItem('key','register')
    location.href='./register.html'
}

async function edit(email) {
    const url = String('http://localhost:5000/getone/' + email)
    console.log(url)
    const response = await fetch(url);
    var data = await response.json();
    row = data[0][0]
    console.log(row[5]);
    sessionStorage.setItem('email', row[0])
    sessionStorage.setItem('fname', row[1])
    sessionStorage.setItem('lname', row[2])
    sessionStorage.setItem('mob', row[3])
    sessionStorage.setItem('address', row[4])
    sessionStorage.setItem('dob', row[5])
    sessionStorage.setItem('key', 'edit')
    location='./register.html'
}



function deleteDetail(email,test) {
    if(test){
        const url ="http://localhost:5000/delete/" + email
        fetch(url, {
            method: 'DELETE',
        });
        return true
    }
    if (confirm("Are you sure")) {
        const url ="http://localhost:5000/delete/" + email
        fetch(url, {
            method: 'DELETE',
        });
        location.reload()
        return true
    }
}


module.exports={
    deleteDetail,
    getapi
}