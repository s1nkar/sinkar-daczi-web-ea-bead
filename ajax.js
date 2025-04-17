const API_URL = 'http://gamf.nhely.hu/ajax2/';
const CODE = 'J8IDDTabc123'; // A saját kódodat írd ide

function readData() {
    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `op=read&code=${CODE}`
    })
    .then(response => response.json())
    .then(data => {
        let output = document.getElementById('output');
        if (data.list && data.list.length > 0) {
            let sum = 0, max = -Infinity;
            let html = '';
            data.list.forEach(item => {
                html += `<p>ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}</p>`;
                const height = parseFloat(item.height);
                if (!isNaN(height)) {
                    sum += height;
                    if (height > max) max = height;
                }
            });
            const avg = (sum / data.list.length).toFixed(2);
            html += `<p>Magasság összeg: ${sum}, Átlag: ${avg}, Legnagyobb: ${max}</p>`;
            output.innerHTML = html;
        } else {
            output.innerHTML = 'Nincs megjeleníthető adat.';
        }
    });
}

function createData() {
    const name = document.getElementById('nameCreate').value.trim();
    const height = document.getElementById('heightCreate').value.trim();
    const weight = document.getElementById('weightCreate').value.trim();
    const msg = document.getElementById('createMessage');

    if (!name || !height || !weight || name.length > 30 || height.length > 30 || weight.length > 30) {
        msg.textContent = 'Hibás adat. A mezők nem lehetnek üresek és max 30 karakter hosszúak!';
        return;
    }

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `op=create&name=${name}&height=${height}&weight=${weight}&code=${CODE}`
    })
    .then(response => response.json())
    .then(data => {
        msg.textContent = data === 1 ? 'Sikeres létrehozás!' : 'Sikertelen létrehozás!';
    });
}

function getDataForId() {
    const id = document.getElementById('updateId').value.trim();
    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `op=read&code=${CODE}`
    })
    .then(response => response.json())
    .then(data => {
        const found = data.list.find(item => item.id === id);
        if (found) {
            document.getElementById('nameUpdate').value = found.name;
            document.getElementById('heightUpdate').value = found.height;
            document.getElementById('weightUpdate').value = found.weight;
        } else {
            alert('Nincs ilyen ID!');
        }
    });
}

function updateData() {
    const id = document.getElementById('updateId').value.trim();
    const name = document.getElementById('nameUpdate').value.trim();
    const height = document.getElementById('heightUpdate').value.trim();
    const weight = document.getElementById('weightUpdate').value.trim();
    const msg = document.getElementById('updateMessage');

    if (!name || !height || !weight || name.length > 30 || height.length > 30 || weight.length > 30) {
        msg.textContent = 'Hibás adat. A mezők nem lehetnek üresek és max 30 karakter hosszúak!';
        return;
    }

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${CODE}`
    })
    .then(response => response.json())
    .then(data => {
        msg.textContent = data === 1 ? 'Sikeres frissítés!' : 'Sikertelen frissítés!';
    });
}

function deleteData() {
    const id = document.getElementById('deleteId').value.trim();
    const msg = document.getElementById('deleteMessage');

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `op=delete&id=${id}&code=${CODE}`
    })
    .then(response => response.json())
    .then(data => {
        msg.textContent = data === 1 ? 'Sikeres törlés!' : 'Sikertelen törlés!';
    });
}
