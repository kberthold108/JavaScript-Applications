import { changeNavBar } from "../../utils/helper.js";
import { displayRegister } from "../../user/register.js";
import { displayDashboard } from "../dashboard/dashboard.js";


let main;
let section;
function initializeHomepageComponent(targetParent, targetSection) {
    main = targetParent;
    section = targetSection;
}

function displayHomepage() {
    
    main.innerHTML = "";

    if (!localStorage.token) {
        section.querySelector("#gettingStarted").removeEventListener("click", displayDashboard);
        section.querySelector("#gettingStarted").addEventListener("click", displayRegister);
    } else {
        section.querySelector("#gettingStarted").removeEventListener("click", displayRegister);
        section.querySelector("#gettingStarted").addEventListener("click", displayDashboard);
    }

    main.appendChild(section);
    changeNavBar();
}


export { initializeHomepageComponent, displayHomepage };