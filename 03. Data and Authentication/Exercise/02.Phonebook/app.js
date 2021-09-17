import { createNewContact } from "./createNewContact.js";
import { loadAllContacts } from "./loadAllContacts.js";
function loadButtons() {
    document.getElementById("btnCreate").addEventListener("click", createNewContact);
    document.getElementById("btnLoad").addEventListener("click", loadAllContacts);
    console.log("buttons Loaded");
}


document.addEventListener("DOMContentLoaded", () => {
    loadButtons();
});
