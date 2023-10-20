let aircrafts = [];

let searchResults = aircrafts.slice();
let currentEditingAircraftId;
document.addEventListener("DOMContentLoaded", function () {
    displayAircrafts(searchResults);
});

function displayAircrafts(data) {
    const list = document.getElementById('aircraftList');
    list.innerHTML = "";

    data.forEach(aircraft => {
        list.insertAdjacentHTML('beforeend', `
            <div class="aircraft-item">
            <button class="aircraftEditButton" onclick="toggleEditAside(${aircraft.id})">Edit aircraft</button>
            <button class="deleteButton" onclick="deleteAircraft(${aircraft.id})">Delete aircraft</button>
                <h4>${aircraft.id}</h4>
                <h4>${aircraft.model}</h4>
                <p>${aircraft.description}</p>
                <p>Price: ${aircraft.price} million</p>
                <p>Type: ${aircraft.type}</p>
            </div>
        `);
    });
}

function toggleAside() {
    document.getElementById('name').value = "";
    document.getElementById('description').value = "";
    document.getElementById('price').value = 0;
    document.getElementById('type').value = "";
    const aside = document.getElementById('aircraftAside');
    if (aside.style.display === "block" || aside.style.display === "") {
        aside.style.display = "none";
    } else {
        aside.style.display = "block";
    }
}

function toggleEditAside(aircraftId) {
    currentEditingAircraftId = aircraftId;
    const aircraftToEdit = aircrafts.find(aircraft => aircraft.id === aircraftId);
    document.getElementById('changeModel').value = aircraftToEdit.model;
    document.getElementById('changeDescription').value = aircraftToEdit.description;
    document.getElementById('changePrice').value = aircraftToEdit.price;
    document.getElementById('changeType').value = aircraftToEdit.type;

    const editAside = document.getElementById('aircraftEditAside');
    if (editAside.style.display === "block" || editAside.style.display === "") {
        editAside.style.display = "none";
    } else {
        editAside.style.display = "block";
    }
}

function saveChangesAircraft() {
    const aircraftID = currentEditingAircraftId;

    let aircraftToEdit = aircrafts.find(aircraft => aircraft.id === aircraftID);


    let model = document.getElementById('changeModel').value;
    let description = document.getElementById('changeDescription').value;
    let price = parseFloat(document.getElementById('changePrice').value);
    let type = document.getElementById('changeType').value;

    if (model === "" || description === "" || type === "" || isNaN(price) || price <= 0) {
        alert("Please ensure all fields are filled correctly, including the price!");
        return;
    }

    aircraftToEdit.model = model
    aircraftToEdit.description = description
    aircraftToEdit.price = price
    aircraftToEdit.type = type
    searchResults = aircrafts.slice();
    displayAircrafts(searchResults);
}

function deleteAircraft (aircraftId)
{
    currentEditingAircraftId = aircraftId;
    const aircraftToDelete = aircrafts.find(aircraft => aircraft.id === aircraftId);
    aircrafts.pop(aircraftToDelete)
    searchResults = aircrafts.slice();
    displayAircrafts(searchResults);
}
function closeEditAside(){
    const neededAside = document.getElementById("aircraftEditAside");
    if (neededAside.style.display === "block" || neededAside.style.display === "") {
        neededAside.style.display = "none";
    } else {
        neededAside.style.display = "block";
    }
}
function saveAircraft() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value);
    const type = document.getElementById('type').value;

    const newAircraft = {
        id: aircrafts.length + 1,
        model: name,
        description: description,
        price: price,
        type: type
    };
    if (newAircraft.price <= 0) {
        alert("Please ensure all fields are filled correctly, including the price!");
        return;
    } else if (newAircraft.description == "" || newAircraft.model == "" || newAircraft.type == 0 || newAircraft.price == 0) {
        return alert("You don't fill the label!");
    }
    else
        aircrafts.push(newAircraft);
    searchResults = aircrafts.slice();
    displayAircrafts(searchResults);
}

function sortByPrice() {
    searchResults.sort((a, b) => b.price - a.price);
    displayAircrafts(searchResults);
}

function findAircraft() {
    const query = document.getElementById('find_input').value.toLowerCase();
    searchResults = aircrafts.filter(aircraft => aircraft.model.toLowerCase().includes(query));
    displayAircrafts(searchResults);
}

function cancelSearch() {
    searchResults = aircrafts.slice();
    displayAircrafts(searchResults);
    document.getElementById('find_input').value = '';
}

function calculateTotalPrice() {
    const totalPrice = searchResults.reduce((acc, curr) => acc + curr.price, 0);
    document.getElementById('totalPrice').textContent = "Total: " + totalPrice + " million";
}
