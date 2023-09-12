const rowsPerPage = 10;
let currentPage = 1;
var data = []

function displayPage(data, pageNumber) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ``;

    const startIndex = (pageNumber - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    for (let i = startIndex; i < endIndex; i++) {
        if (data[i]) {
            let dob = (data[i].dateOfBirth)
            dob = dob.slice(8, 10) + '-' + dob.slice(5, 7) + '-' + dob.slice(0, 4)
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class='cell'>${data[i].email}</td>
                <td class='cell'>${data[i].firstName}</td>
                <td class='cell'>${data[i].lastName}</td>
                <td class='cell'>${data[i].mobile}</td>
                <td class='cell'>${dob}</td>
                <td class='cell'>
                <button class='action-buttons' onclick='edit("${data[i].email}")' id='edit'><img src="../Frontend/assets/images/editIcon.png" alt="" class='icon' title="Edit"></button>
                <button class='action-buttons' onclick='deleteDetail("${data[i].email}")' id='del'><img src="../Frontend/assets/images/trashIcon.png" alt="" class='icon' title="Delete"></button>
                </td>
            `;
            tableBody.appendChild(row);
        }
    }
    const pageInfo = document.getElementById('pageInfo');
    pageInfo.textContent = `Page ${pageNumber} of ${Math.ceil(data.length / rowsPerPage)}`;
}

function previous() {
    if (currentPage > 1) {
        currentPage--;
        displayPage(data, currentPage);
    }
}

function next() {
    if (currentPage < Math.ceil(data.length / rowsPerPage)) {
        currentPage++;
        displayPage(data, currentPage);
    }

}





// ---------------------------------------------------------------------------------------------------------------------------------------
async function getapi(test) {
    if (test) {
        let url = "http://127.0.0.1:5000/getDetails"
        const response = await fetch(url);
        if (response.status == 204) {
            data = []
        } else if (response.status == 200) {
            data = await response.json();
        }
        return true
    } else {
        let url = "http://127.0.0.1:5000/getDetails"
        const response = await fetch(url);
        if (response.status == 204) {
            document.getElementById('table-body').innerHTML = `<tr><td colspan='6'>NO DATA IN DATABASE FOR THIS USER</td><tr>`
        } else if (response.status == 200) {
            var details = await response.json();
            details.map((d) => {
                data.push(d)
            })
            displayPage(data, currentPage);
        }
    }
}

function register() {
    sessionStorage.setItem('key', 'register')
    location.href = './register.html'
}

async function edit(email) {
    const url = String('http://localhost:5000/getone/' + email)
    const response = await fetch(url);
    var data = await response.json();
    row = data[0][0]
    sessionStorage.setItem('email', row[0])
    sessionStorage.setItem('fname', row[1])
    sessionStorage.setItem('lname', row[2])
    sessionStorage.setItem('mob', row[3])
    sessionStorage.setItem('address', row[4])
    sessionStorage.setItem('dob', row[5])
    sessionStorage.setItem('key', 'edit')
    location.href = './register.html'
}



function deleteDetail(email, test) {
    if (test) {
        const url = "http://localhost:5000/delete/" + email
        fetch(url, {
            method: 'DELETE',
        });
        return true
    }
    if (confirm("Are you sure ?")) {
        const url = "http://localhost:5000/delete/" + email
        fetch(url, {
            method: 'DELETE',
        });
        location.reload()
        return true
    }
}

function search(name) {
    if(name!=""){
        searchdata=[]
        for (let i = 0; i < data.length; i++) {
            if(String(name).toLowerCase()==String(data[i].firstName).toLowerCase()){
                searchdata.push(data[i])
            }
        }
        if(searchdata.length==0){
            document.getElementById('table-body').innerHTML = `<tr><td colspan='6'>${name} is not in database</td><tr>`
        }else{
            displayPage(searchdata,currentPage)
        }
        document.getElementById('search').value=""
    }
}

try {
    module.exports = {
        deleteDetail,
        getapi
    }
} catch {

}