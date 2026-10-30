const API = "http://localhost:8080";


// Show Section
function showSection(sectionName) {

    let sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.add("hidden");
    });

    document
        .getElementById(sectionName)
        .classList.remove("hidden");

    if (sectionName === "dashboard") {
        loadSlots();
    }

    if (sectionName === "slots") {
        loadAllSlots();
    }
}


// Load Parking Slots
async function loadSlots() {

    try {

        const response = await fetch(API + "/slots");

        const data = await response.json();

        let container =
            document.getElementById("slotContainer");

        container.innerHTML = "";

        let occupied = 0;

        data.forEach(slot => {

            let div = document.createElement("div");

            div.classList.add("slot");

            if (slot.status === "occupied") {

                div.classList.add("occupied");

                occupied++;

                div.innerHTML =
                    "🚗<br>Slot " + slot.slot;

            } else {

                div.classList.add("available");

                div.innerHTML =
                    "🅿️<br>Slot " + slot.slot;
            }

            container.appendChild(div);

        });


        document.getElementById("totalSlots").innerText =
            data.length;

        document.getElementById("occupiedSlots").innerText =
            occupied;

        document.getElementById("availableSlots").innerText =
            data.length - occupied;

    }

    catch (error) {

        console.log(error);

    }
}


// Park Vehicle
async function parkVehicle() {

    let vehicleNumber =
        document.getElementById("vehicleNumber").value;

    let vehicleType =
        document.getElementById("vehicleType").value;


    if (vehicleNumber === "") {

        alert("Enter vehicle number");

        return;
    }


    const response = await fetch(
        API + "/park",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                vehicleNo: vehicleNumber,
                type: vehicleType
            })
        }
    );


    const data = await response.json();


    document.getElementById("parkMessage").innerText =
        data.message;


    if (data.success) {

        document.getElementById("vehicleNumber").value = "";

        loadSlots();

    }

}


// Remove Vehicle
async function removeVehicle() {

    let number =
        document.getElementById("removeNumber").value;

    let hours =
        document.getElementById("hours").value;


    const response = await fetch(
        API + "/remove",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                vehicleNo: number,
                hours: Number(hours)
            })
        }
    );


    const data = await response.json();


    document.getElementById("removeMessage").innerText =
        data.message;


    if (data.success) {

        document.getElementById("removeNumber").value = "";

        document.getElementById("hours").value = "";

        loadSlots();

    }

}


// Search Vehicle
async function searchVehicle() {

    let number =
        document.getElementById("searchNumber").value;


    const response = await fetch(
        API + "/search?vehicle=" +
        encodeURIComponent(number)
    );


    const data = await response.json();


    let result =
        document.getElementById("searchResult");


    if (!data.found) {

        result.innerHTML =
            "<b>Vehicle not found!</b>";

        return;
    }


    result.innerHTML = `

        <h3>Vehicle Found</h3>

        <p>
            <b>Vehicle Number:</b>
            ${data.vehicleNo}
        </p>

        <p>
            <b>Vehicle Type:</b>
            ${data.type}
        </p>

        <p>
            <b>Parking Slot:</b>
            ${data.slot}
        </p>

    `;
}


// Load all slots
async function loadAllSlots() {

    const response =
        await fetch(API + "/slots");

    const data =
        await response.json();


    let container =
        document.getElementById("allSlots");

    container.innerHTML = "";


    data.forEach(slot => {

        let div =
            document.createElement("div");

        div.classList.add("slot");


        if (slot.status === "occupied") {

            div.classList.add("occupied");

            div.innerHTML =
                "🚗<br>Slot " + slot.slot;

        } else {

            div.classList.add("available");

            div.innerHTML =
                "🅿️<br>Slot " + slot.slot;
        }


        container.appendChild(div);

    });

}


// Start Dashboard
loadSlots();