function getInfo() {
    const input = document.getElementById("stopId");

    const stopName = document.getElementById("stopName");
    const list = document.getElementById("buses");


    fetch(`http://localhost:3030/jsonstore/bus/businfo/${input.value}`)
        .then(response => {
            if (response.textContent === "") {
                stopName.textContent = "Error";
            }
            return response.json();
        })
        .then(data => {
            stopName.textContent = data.name;
            console.log(Object.entries(data.buses));

            Object.entries(data.buses).forEach(bus => {
                console.log(bus);
                const li = document.createElement("li");
                li.textContent = `Bus ${bus[0]} arrives in ${bus[1]} Minutes`;
                list.appendChild(li);
            });
        })
        .catch(() => {
			stopName.textContent = "Error";
		});
}