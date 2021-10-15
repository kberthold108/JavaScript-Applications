import { desirializeForm, displayMessage, redirect } from "./helpers.js";
import { login } from "./login.js";
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
    if(!validateForm(formData)) {
        displayMessage("Form not valid...");
    }

    const success = await login(registerUrl, formData);

    if(success) {
        redirect("login.html", "homeLogged.html");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("register").addEventListener("submit", onSubmit);
});