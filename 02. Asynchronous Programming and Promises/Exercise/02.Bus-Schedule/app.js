
const departButton = document.getElementById("depart");
const arriveButton = document.getElementById("arrive");


const [info] = document.getElementsByClassName("info");


let curr = "depot";
let nextId = "depot";

function arrive() {
    info.textContent = `Arriving at ${curr}`;

    arriveButton.disabled = true;
    departButton.disabled = false;
}


function depart() {
    fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextId}`)
        .then(response => {
            if (response.textContent === "") {
                throw Error("Error");
            }
            arriveButton.disabled = false;
            departButton.disabled = true;
            return response.json();
        })
        .then(data => {
            curr = data.name;
            info.textContent = `Next stop ${data.name}`;
            nextId = data.next;
        })
        .catch(err => {
            info.textContent = "Error";
            arriveButton.disabled = true;
            departButton.disabled = true;
        });
}

