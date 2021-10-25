import { validateRegisterInput, resetForm } from "../utils/helper.js";
import { userAuth } from "../api/userAuth.js";
import { displayHomepage } from "../components/homepage/homepage.js";
import { displayLogin } from "./login.js";
let main;
let section;
function initializeRegisterComponent(targetParent, targetSection) {
    main = targetParent;
    section = targetSection;
}

function displayRegister(event) {
    event.preventDefault();
    main.innerHTML = "";
    section.querySelector("#registerForm").addEventListener("submit", registerNewUser);
    section.querySelector("#signIn").addEventListener("click", displayLogin);
    main.appendChild(section);
    
}

async function registerNewUser(event) {
    event.preventDefault();
    const [email, password, rePass] = section.querySelectorAll("input");
    if (!validateRegisterInput(email.value, password.value, rePass.value)) {
        alert("Input was not good");
        return;
    }
    await userAuth(email.value, password.value, "http://localhost:3030/users/register");
    resetForm(event.target);
    displayHomepage();
    
}

export { initializeRegisterComponent, displayRegister };