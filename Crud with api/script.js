const url = "https://jsonplaceholder.typicode.com/todos";

async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    show(data);
}



getapi(url);


function show(data) {
    let tabrow =
        `<tr>
    <th>userId</th>
    <th>Id</th>
    <th>Title</th>
    <th>completed</th>
    </tr>`;
    for (let i = 1; i < data.length; i++) {
        let todo = data[i];
        tabrow +=
            `<tr>
        <td>${todo["userId"]}</td>
        <td>${todo["id"]}</td>
        <td>${todo["title"]}</td>
        <td>${todo["completed"]}</td>
        </tr>`;

    }
    document.getElementById("todos").innerHTML = tabrow;
}

function editData(){
}