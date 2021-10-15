import { userAuth } from "../requests.js";
import { validateregisterInput, clearForm } from "../helper.js";
import { displayHomepage } from "../homepage.js";
let main;
let section;
function initializeRegisterComponent(targetParent, targetSection) {
    main = targetParent;
    section = targetSection;
}


function displayRegister() {
    main.innerHTML = "";
    section.querySelector("#register").addEventListener("click", validateAll);
    main.appendChild(section);
}

function validateAll(event) {
    try {
        const parent = (event.target.parentNode);
        const [email, password, rePass] = parent.getElementsByTagName("input");
        if (!validateregisterInput(email.value, password.value, rePass.value)) {
            throw Error("Something was wrong with your Input!");
        }
        userAuth(email.value, password.value, "http://localhost:3030/users/register");
        clearForm(parent);
        displayHomepage();
    } catch(err) {
        alert(err.message);
    }
    
}

export { initializeRegisterComponent, displayRegister };