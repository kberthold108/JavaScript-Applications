import { desirializeForm, displayMessage, changeNavigationState } from "../helpers.js";
import { displayCatalog } from "../catalog.js";
const loginURL = "http://localhost:3030/users/login";

async function login(url, body) {
    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const responseText = JSON.parse(await response.text());
        displayMessage(responseText.message);
        return false;
    }

    const data = await response.json();
    sessionStorage.setItem("accessToken", data.accessToken);
    sessionStorage.setItem("userID", data._id);

    changeNavigationState();
    return true;
}

async function onSubmit(event) {
    event.preventDefault();
    const success = await login(loginURL, desirializeForm(event.target));

    if (success) {
        displayCatalog();
    }
}

let main;
let section;
let setNavActive;

function initializeLoginComponent(targetParent, targetSection, onNavChange) {
    main = targetParent;
    section = targetSection;
    setNavActive = onNavChange;

    const form = section.querySelector("form");
    form.addEventListener("submit", onSubmit);
}

function displayLogin() {
    setNavActive("loginLink");
    main.innerHTML = "";
    main.appendChild(section);
}

export { initializeLoginComponent, displayLogin, login };

