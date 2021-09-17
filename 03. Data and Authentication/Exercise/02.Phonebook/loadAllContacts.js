export async function loadAllContacts() {
    
    const ul = document.getElementById("phonebook");
    ul.textContent = "";
    try {
        const response = await fetch("http://localhost:3030/jsonstore/phonebook/phonebook");
        const data = await response.json();
        console.log("awdia")
        for (const person of Object.keys(data)) {
            const li = document.createElement("li");
            li.textContent = `${data[person].person}:${data[person].phone}`;
            const btn = document.createElement("button");
            btn.textContent = "Delete";
            btn.addEventListener("click", deletePhone);
            li.id = person;
            li.appendChild(btn);
            ul.appendChild(li);
        }
    } catch(err) {
        console.log(err);
    }
}

async function deletePhone(event) {
    const phone = event.target.parentNode;
        const response = await fetch(`http://localhost:3030/jsonstore/phonebook/phonebook/${phone.id}`, {
        method: "DELETE",
    });
    loadAllContacts();
}