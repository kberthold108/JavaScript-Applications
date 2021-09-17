export async function createNewContact() {
    const person = document.getElementById("person");
    const phone = document.getElementById("phone");
    const message = {
        "person": person.value,
        "phone": phone.value
    };

    try {
        await fetch("http://localhost:3030/jsonstore/phonebook/phonebook", {
            method: "POST",
            body: JSON.stringify(message)
        });
        person.value = "";
        phone.value = "";
    } catch (err) {
        console.log(err);
    }
}