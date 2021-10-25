import { getAllIdeas } from "../../api/request.js";
import { ideaTemplate } from "../../templates/ideaTemplate.js";
import { displayDetail } from "../dashboard/ideaDetail.js";
let main;
let section;
function initializeDashboardComponent(targetParent, targetSection) {
    main = targetParent;
    section = targetSection;
}

async function displayDashboard() {
    
    main.innerHTML = "";
    
    main.appendChild(section);
    
    const ideas = await getAllIdeas();
    if (ideas) {
        document.getElementById("dashboard-holder").innerHTML = "";
        for (const idea of ideas) {
            const temp = ideaTemplate(idea);
            document.getElementById("dashboard-holder").innerHTML += temp;
        }
        Array.from(document.getElementById("dashboard-holder").getElementsByTagName("a")).forEach(x => x.addEventListener("click", displayDetail));
    } else {
        document.getElementById("dashboard-holder").innerHTML += "<p>No Ideas yet! Be the first one :D";
    }
}

export { initializeDashboardComponent, displayDashboard };
