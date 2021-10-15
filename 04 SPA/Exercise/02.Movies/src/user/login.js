import { clearForm, validateInput } from "../helper.js";
import { userAuth } from "../requests.js";
import { displayHomepage } from "../homepage.js";
let main;
let section;
function initializeLoginComponent(targetParent, targetSection) {
    main = targetParent;
    section = targetSection;
}


function displayLogin() {
    main.innerHTML = "";
    section.querySelector("#login").addEventListener("click", validateAll);
    main.appendChild(section);
}

function validateAll(event) {
    try {
        const parent = (event.target.parentNode);
        const [email, password] = parent.getElementsByTagName("input");
        if (!validateInput(email.value, password.value)) {
            throw Error("Something was wrong with your Input!");
        }
        userAuth(email.value, password.value, "http://localhost:3030/users/login");
        clearForm(parent);
        displayHomepage();
    } catch(err) {
        alert(err.message);
    }
}

export { initializeLoginComponent, displayLogin };