// export const myvar=["SAKTHI","PRASANTH"];
async function getapi() {
    let url = "http://127.0.0.1:5000/getDetails"
    const response = await fetch(url);
    var data = await response.json();
    console.log(response)
    show(data);
}
let date = new Date()
console.log(date)
function show(data) {
    let tabrow = ``;
    for (let i = 0; i < data.length; i++) {
        let info = data[i];
        tabrow +=
            `<tr>
        <td>${info["email"]}</td>
        <td>${info["firstName"]}</td>
        <td>${info["lastName"]}</td>
        <td>${info["mobile"]}</td>
        <td>${info["address"]}</td>
        <td>
        <button class='action-buttons' onclick=edit("${info['email']}") >EDIT</button>
        <button class='action-buttons' onclick=deleteDetail("${info['email']}")>DELETE</button>
        </td>
        </tr>`;
    }
    document.getElementById("table-body").innerHTML = tabrow;
}
async function edit(email) {
    const url = String('http://localhost:5000/getone/' + email)
    console.log(url)
    const response = await fetch(url);
    var data = await response.json();
    row = data[0][0]
    // myvar.push(row)
    sessionStorage.setItem('email', row[0])
    sessionStorage.setItem('fname', row[1])
    sessionStorage.setItem('lname', row[2])
    sessionStorage.setItem('mob', row[3])
    sessionStorage.setItem('address', row[4])
    sessionStorage.setItem('dob', row[5])
    location='./edit.html'
    // location.href = './edit.html'
}

function editForm() {
    // console.log(myvar);
    document.getElementById('firstName').value = sessionStorage.getItem('fname')
    document.getElementById('lastName').value = sessionStorage.getItem('lname')
    document.getElementById('email').value = sessionStorage.getItem('email')
    document.getElementById('mobile').value = sessionStorage.getItem('mob')
    document.getElementById('address').value = sessionStorage.getItem('address')
    document.getElementById('dateOfBirth').value = sessionStorage.getItem('dob')
}

function check() {
    if (!document.getElementById('firstName').value === "") {
        alert("Please fill first name")
        return false
    } else if (document.getElementById('lastName').value === "") {
        alert("Please fin in last name")
        return false
    } else if (document.getElementById('email').value === "") {
        alert("Please fill in email")
        return false
    } else if (document.getElementById('mobile').value === "") {
        alert("Please fill in mobile")
        return false
    } else if (document.getElementById('address').value === "") {
        alert("Please fill in address")
        return false
    } else if (document.getElementById('dateOfBirth').value === "") {
        alert("Please select a date")
        return false
    }
    mail()
    editDetail()
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

function mail() {
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(document.getElementById('email').value)) {
        document.getElementById('email-err').style.display = "none"
    } else {
        document.getElementById('email-err').style.display = "block"

    }
}
function fname() {
    var txt = document.getElementById('firstName').value
    if (/^[A-Za-z]+$/.test(txt)) {
        document.getElementById('fname-err').style.display = "none"
    } else {
        document.getElementById('fname-err').style.display = "block"
    }

}

function lname() {
    var txt = document.getElementById('lastName').value
    if (/^[A-Za-z]+$/.test(txt)) {
        document.getElementById('lname-err').style.display = "none"
    } else {
        document.getElementById('lname-err').style.display = "block"
    }
}


function deleteDetail(email) {
    if (confirm("Are you sure")) {
        const url = String("http://localhost:5000/delete/" + email)
        console.log(url)
        fetch(url, {
            method: 'DELETE',
        });
        location.reload()
    }
}
