const url = "https://jsonplaceholder.typicode.com/todos";
var size = 0;
async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    // var data;
    // fetch(url).then((response) => response.json()).then((data) =>  console.log(data));
    // size = data.length;
    show(data);
}
getapi(url);


function show(data) {
    //     let tabrow=`<tr>
    //     <th>userId</th>
    //     <th>Id</th>
    //     <th>Title</th>
    //     <th>completed</th>
    //     </tr>`;

    // for (let i = 1; i < data.length; i++) {
    //     let todo = data[i];
    //     tabrow +=
    //         `<tr>
    //     <td>${todo["userId"]}</td>
    //     <td>${todo["id"]}</td>
    //     <td>${todo["title"]}</td>
    //     <td>${todo["completed"]}</td>
    //     </tr>`;

    // }
    let tabrow = ``;
    data.map((item) => {
        tabrow += (
            `<tr>
                <td>${item.userId}</td>
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td>${item.completed}</td>
            </tr>`
        )
    });
    document.getElementById("todos").innerHTML = tabrow;
}


function addtodoform() {
    document.getElementById("todo-form").style.display = "block";
}

function addtodo() {
    if (document.getElementById("UserId").value == '') {
        // console.log("hi");
        alert("Please fill userid");
        return false;
    }
    if (document.getElementById("title").value == '') {
        // console.log("title")
        alert("Please fill title");
        return false;
    }
    if (document.getElementById("completed").value == "") {
        alert("Please select completed feild");
        return false;
    }
    let data = {
        userId: document.getElementById("UserId").value,
        id: size + 1,
        title: document.getElementById("title").value,
        completed: document.getElementById("completed").value
    }
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json;charset=UTF-8', }
    }).then((response => response.json())).then(json => console.log(json));
    document.getElementById("todo-form").style.display = "none";
}

function edittodoform() {
    document.getElementById("edit-form").style.display = "block";
}
async function edittodo() {
    if(document.getElementById("id").value=="" || document.getElementById("id").value<1 || document.getElementById("id").value>200){
        alert("Please enter a valid id between 1-200");
        return false;
    }
    const response = await fetch(url);
    var data = await response.json();
    document.getElementById("edited-form").style.display = "block";
    let eid = document.getElementById("id").value;
    var item = data[eid - 1];
    document.getElementById("eUserId").value = item.userId;
    document.getElementById("etitle").value = item.title;
    document.getElementById("ecompleted").value = item.completed;
}

function updatetodo() {
    if(document.getElementById("eUserId").value==""){
        alert("Please fill userid");
        return false;
    }
    if(document.getElementById("etitle").value==""){
        alert("Please fill title");
        return false;
    }
    let eid = document.getElementById("id").value;
    var item = {
        userId: document.getElementById("eUserId").value,
        id: eid,
        title: document.getElementById("etitle").value,
        completed: document.getElementById("ecompleted").value
    }
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: { 'Content-type': 'application/json; charset=UTF-8', },
    }).then(response => response.json()).then(json => console.log(json));
    document.getElementById("edited-form").style.display = "none";
    document.getElementById("edit-form").style.display = "none";
}

function deletetodoform() {
    document.getElementById("delete-form").style.display = "block";
}

function deletetodo() {
    // console.log(document.getElementById("delid").value);
    if(document.getElementById("delid").value=="" || document.getElementById("delid").value<1 || document.getElementById("delid").value>200){
        alert("Please enter a valid id between 1-200");
        return false;
    }
    var delurl = url + "/" + document.getElementById("delid").value;
    fetch(delurl, {
        method: 'DELETE',
    });
    document.getElementById("delete-form").style.display = "none";
    alert("todo data deleted");
}
