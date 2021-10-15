import { desirializeForm, displayMessage } from "../helpers.js";
import { login } from "./login.js";
import { displayCatalog } from "../catalog.js";
const registerUrl = "http://localhost:3030/users/register";


function validateForm(formData) {

    if (formData.password !== formData.rePass) {
        return false;
    }

    return true;
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = desirializeForm(event.target);
    if (!validateForm(formData)) {
        displayMessage("Form not valid...");
    }

    const success = await login(registerUrl, formData);

    if (success) {
        displayCatalog();
    }
}

let main;
let section;
let setNavActive;

function initializeRegisterComponent(targetParent, targetSection, onNavChange) {
    main = targetParent;
    section = targetSection;
    setNavActive = onNavChange;

    const form = section.querySelector("form");
    form.addEventListener("submit", onSubmit);
}

function displayRegister() {
    setNavActive("registerLink");
    main.innerHTML = "";
    main.appendChild(section);
}

export { initializeRegisterComponent, displayRegister };