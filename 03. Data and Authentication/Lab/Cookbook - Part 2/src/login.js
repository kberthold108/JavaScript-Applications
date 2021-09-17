import { desirializeForm, displayMessage, redirect } from "./helpers.js";
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
    return true;
}

async function onSubmit(event) {
    event.preventDefault();
    const success = await login(loginURL, desirializeForm(event.target));

    if (success) {
        redirect("login.html", "index.html");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById("login");
    if (login) {
        login.addEventListener("submit", onSubmit);
    }
});

export { login };

