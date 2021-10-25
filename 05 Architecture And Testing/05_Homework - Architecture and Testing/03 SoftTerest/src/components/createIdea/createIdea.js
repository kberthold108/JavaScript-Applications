import { validateCreateInput } from "../../utils/helper.js";
import { createIdea } from "../../api/request.js";
import { displayDashboard } from "../dashboard/dashboard.js";

let main;
let section;
function initializeCreateComponent(targetParent, targetSection) {
    main = targetParent;
    section = targetSection;
}

function displayCreateIdea() {

    main.innerHTML = "";
    section.querySelector("#createIdeaForm").addEventListener("submit", createNewIdea);
    main.appendChild(section);
}

async function createNewIdea(event) {
    event.preventDefault();
    const [title, img] = Array.from(event.target.getElementsByTagName("input"));
    const [description] = Array.from(event.target.getElementsByTagName("textarea"));
    if (!validateCreateInput(title.value, description.value, img.value)) {
        alert("Input is wrong");
        return;
    }
    await createIdea(title.value, description.value, img.value);
    displayDashboard();
}

export { initializeCreateComponent, displayCreateIdea };