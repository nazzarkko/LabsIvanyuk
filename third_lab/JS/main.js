let aircrafts = [
    { id: 1, model: "MiG-21", description: "From Slovakia", price: 30, type: "Fighter" },
    { id: 2, model: "AH-30", description: "Ukraine", price: 90, type: "Reconnaissance" },
    { id: 3, model: "MiG-29", description: "Ukraine", price: 40, type: "Fighter" },
    { id: 4, model: "F-16", description: "From USA", price: 190, type: "Fighter" },
    { id: 5, model: "F-16", description: "From Netherlands", price: 190, type: "Fighter" },
    { id: 6, model: "Su-24M", description: "Ukraine", price: 168, type: "Bomber" },
    { id: 7, model: "Il-29", description: "Ukraine", price: 70, type: "Transporter" },
    { id: 8, model: "Su-27", description: "From Polska", price: 18, type: "Fighter" },
];

let search_results = aircrafts.slice();

document.addEventListener("DOMContentLoaded", function() {
    display_aircrafts(search_results);
});

function display_aircrafts(data) {
    const list = document.getElementById('aircraft_list');
    list.innerHTML = "";

    data.forEach(aircraft => {
        list.insertAdjacentHTML('beforeend', `
            <div class="aircraft-item">
                <h4>${aircraft.model}</h4>
                <p>${aircraft.description}</p>
                <p>Price: ${aircraft.price} million</p>
                <p>Type: ${aircraft.type}</p>
            </div>
        `);
    });
}

function sort_price() {
    search_results.sort((a, b) => b.price - a.price);
    display_aircrafts(search_results);
}

function find_aircrafts() {
    const query = document.getElementById('find_input').value.toLowerCase();
    search_results = aircrafts.filter(aircraft => aircraft.model.toLowerCase().includes(query));
    display_aircrafts(search_results);
}

function cancel_search() {
    search_results = aircrafts.slice();
    display_aircrafts(search_results);
    document.getElementById('find_input').value = '';
}
function calculate_total_price() {
    const total_price = search_results.reduce((acc, curr) => acc + curr.price, 0);
    document.getElementById('total_price').textContent = "Total: " + total_price + " million";
}
