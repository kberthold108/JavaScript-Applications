import { validateLoginInput, resetForm } from "../utils/helper.js";
import { userAuth } from "../api/userAuth.js";
import { displayHomepage } from "../components/homepage/homepage.js";
import { displayRegister } from "./register.js";

let main;
let section;
function initializeLoginComponent(targetParent, targetSection) {
    main = targetParent;
    section = targetSection;
}


function displayLogin(event) {
    event.preventDefault();
    main.innerHTML = "";
    section.querySelector("#loginForm").addEventListener("submit", loginUser);
    section.querySelector("#signUp").addEventListener("click", displayRegister);
    main.appendChild(section);
    
}

async function loginUser(event) {
    event.preventDefault();
    const [email, password] = section.querySelectorAll("input");
    if (!validateLoginInput(email.value, password.value)) {
        alert("Input was not good");
        return;
    }
    await userAuth(email.value, password.value, "http://localhost:3030/users/login");
    resetForm(event.target);
    displayHomepage();
}


export { initializeLoginComponent, displayLogin };