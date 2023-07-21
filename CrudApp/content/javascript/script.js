var sr = null;
function apply() {
    var fd = read();
    if (sr == null)
        addemp(fd);
    else
        updater(fd)
    restf();
}

function read() {
    var fd = {};
    fd["fullName"] = document.getElementById("fullName").value;
    fd["lastName"] = document.getElementById("lastName").value;
    fd["email"] = document.getElementById("email").value;
    fd["salary"] = document.getElementById("salary").value;
    return fd;
}

function addemp(data) {
    var tab = document.getElementById("employeeList").getElementsByTagName("tbody")[0];
    var rows = tab.insertRow(tab.length);
    var cell1 = rows.insertCell(0);
    cell1.innerHTML = data.fullName;
    var cell2 = rows.insertCell(1);
    cell2.innerHTML = data.lastName;
    var cell3 = rows.insertCell(2);
    cell3.innerHTML = data.email;
    var cell4 = rows.insertCell(3);
    cell4.innerHTML = data.salary;
    var cell5 = rows.insertCell(4);
    cell5.innerHTML = `<button onClick="editr(this)">Edit</button>
                     <button onClick="delr(this)">Delete</button>`;
}

function restf() {
    document.getElementById("fullName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("salary").value = "";
}

function editr(td) {
    sr = td.parentElement.parentElement;
    document.getElementById("fullName").value = sr.cells[0].innerHTML;
    document.getElementById("lastName").value = sr.cells[1].innerHTML;
    document.getElementById("email").value = sr.cells[2].innerHTML;
    document.getElementById("salary").value = sr.cells[3].innerHTML;
}

function updater(d) {
    sr.cells[0].innerHTML = d.fullName;
    sr.cells[1].innerHTML = d.lastName;
    sr.cells[2].innerHTML = d.email;
    sr.cells[3].innerHTML = d.salary;
}

function delr(d) {
    if (confirm("Are you sure to delete this data?")) {
        row = d.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        restf();
    }
}