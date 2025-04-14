var selectedRow = null;

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    return {
        vezeteknev: document.getElementById("vezeteknev").value,
        keresztnev: document.getElementById("keresztnev").value,
        lakhely: document.getElementById("lakhely").value,
        megjegyzes: document.getElementById("megjegyzes").value
    };
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    newRow.insertCell(0).innerHTML = data.vezeteknev;
    newRow.insertCell(1).innerHTML = data.keresztnev;
    newRow.insertCell(2).innerHTML = data.lakhely;
    newRow.insertCell(3).innerHTML = data.megjegyzes;
    newRow.insertCell(4).innerHTML = `<a onClick="onEdit(this)">Edit</a>
                                      <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("vezeteknev").value = "";
    document.getElementById("keresztnev").value = "";
    document.getElementById("lakhely").value = "";
    document.getElementById("megjegyzes").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("vezeteknev").value = selectedRow.cells[0].innerHTML;
    document.getElementById("keresztnev").value = selectedRow.cells[1].innerHTML;
    document.getElementById("lakhely").value = selectedRow.cells[2].innerHTML;
    document.getElementById("megjegyzes").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(data) {
    selectedRow.cells[0].innerHTML = data.vezeteknev;
    selectedRow.cells[1].innerHTML = data.keresztnev;
    selectedRow.cells[2].innerHTML = data.lakhely;
    selectedRow.cells[3].innerHTML = data.megjegyzes;
}

function onDelete(td) {
    if (confirm('Biztos törlöd a rekordot ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    let isValid = true;

    const vezeteknev = document.getElementById("vezeteknev");
    const keresztnev = document.getElementById("keresztnev");

    if (vezeteknev.value === "") {
        isValid = false;
        document.getElementById("vezeteknevValidationError").classList.remove("hide");
    } else {
        document.getElementById("vezeteknevValidationError").classList.add("hide");
    }

    if (keresztnev.value === "") {
        isValid = false;
        document.getElementById("keresztnevValidationError").classList.remove("hide");
    } else {
        document.getElementById("keresztnevValidationError").classList.add("hide");
    }

    return isValid;
}

function search() {
    var input = document.getElementById("searchbox");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("employeeList");
    var tr = table.getElementsByTagName("tr");

    for (var i = 1; i < tr.length; i++) { // 0. sor a fejléc
        var tds = tr[i].getElementsByTagName("td");
        var rowVisible = false;

        for (var j = 0; j < tds.length - 1; j++) { // utolsó oszlop a művelet, azt ne nézzük
            if (tds[j]) {
                var txtValue = tds[j].textContent || tds[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    rowVisible = true;
                    break;
                }
            }
        }

        tr[i].style.display = rowVisible ? "" : "none";
    }
}

let sortDirection = {};

function sortTable(columnIndex) {
    var table = document.getElementById("employeeList");
    var rows, switching, i, x, y, shouldSwitch;
    switching = true;
    sortDirection[columnIndex] = !sortDirection[columnIndex];
    let direction = sortDirection[columnIndex] ? "asc" : "desc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[columnIndex];
            y = rows[i + 1].getElementsByTagName("TD")[columnIndex];
            if (!x || !y) continue;
            let xContent = x.textContent || x.innerText;
            let yContent = y.textContent || y.innerText;
            if (direction === "asc" && xContent.toLowerCase() > yContent.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
            if (direction === "desc" && xContent.toLowerCase() < yContent.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function getLOcation() {
    var x = document.getElementById("demo");
		function getLocation()  {
			if (navigator.geolocation)
				navigator.geolocation.getCurrentPosition(showPosition);
			else 
				x.innerHTML = "Geolocation is not supported by this browser.";
		}
		function showPosition(position)  {
			x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;	
			var newContent = '<iframe src = "https://maps.google.com/maps?q=' + position.coords.latitude + ',' + position.coords.longitude + '&hl=es;z=14&amp;output=embed" width="600" height="450"></iframe>';
			var contentHolder = document.getElementById('content-holder');
			contentHolder.innerHTML = newContent;
		}
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}