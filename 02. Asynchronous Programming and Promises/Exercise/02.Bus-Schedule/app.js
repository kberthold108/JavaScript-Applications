
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


function depart1() {
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

async function asyncDepart() {
    try {
        let next = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextId}`);
        next = await next.json();
        arriveButton.disabled = false;
        departButton.disabled = true;
        curr = next.name;
        info.textContent = `Next stop ${next.name}`;
        nextId = next.next;
    } catch (err) {
        info.textContent = "Error";
        arriveButton.disabled = true;
        departButton.disabled = true;
    }
}

