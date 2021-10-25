import { getIdeaById, deleteIdea } from "../../api/request.js";
import { displayDashboard } from "../dashboard/dashboard.js";

let main;
let section;
let btn;
function initializeDetailComponent(targetParent, targetSection) {
    main = targetParent;
    section = targetSection;
    btn = section.querySelector("#detailDeleteBtn");
}
let currID;
async function displayDetail(event) {
    main.innerHTML = "";
    const idea = await getIdeaById(event.target.parentNode.id);
    section.querySelector("#detailImg").src = idea.img;
    section.querySelector("#detailName").textContent = idea.title;
    section.querySelector("#detailDesc").textContent = idea.description;
    currID = event.target.parentNode.id;
    if (localStorage.userID === idea._ownerId) {
        section.querySelector(".text-center").appendChild(btn);
        section.querySelector("#detailDeleteBtn").addEventListener("click", deleteIdeaById);
    } else {
        
        section.querySelector(".text-center").removeChild(btn);
        
    }
    main.appendChild(section);
}

async function deleteIdeaById() {
    await deleteIdea(currID);
    displayDashboard();
}


export { initializeDetailComponent, displayDetail };