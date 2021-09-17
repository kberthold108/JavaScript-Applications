import { loadRecipies } from "./partOneApp.js";
import { logout } from "./logout.js";


function displayHeaders() {
    const displayModes = {
        loggedIn: document.getElementById("user"),
        loggedOut: document.getElementById("guest"),
    };

    const logoutBtn = document.getElementById("logoutBtn");

    if(sessionStorage.getItem("accessToken")) {
        displayModes.loggedIn.style.display = "inline-block";
        displayModes.loggedOut.style.display = "none";
        logoutBtn.addEventListener("click", logout);
    } else {
        displayModes.loggedOut.style.display = "inline-block";
        displayModes.loggedIn.style.display = "none";
        logoutBtn.removeEventListener("click", logout);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayHeaders();
    loadRecipies();
});