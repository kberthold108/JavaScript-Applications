import { getMovieById, updateMovie } from "./requests.js";
import { displayHomepage } from "./homepage.js";

let main;
let section;
function initializeEditComponent(targetParent, targetSection) {
    main = targetParent;
    section = targetSection;
}


let id;
async function displayEdit(event) {
    main.innerHTML = "";
    const currID = event.target.parentNode.id;
    id = currID;
    const movie = await getMovieById(currID);
    const [ title, desc, img ] = section.getElementsByTagName("input");
    title.value = movie.title;
    desc.value = movie.description;
    img.value = movie.img;
    section.querySelector("#editMovieForm").addEventListener("submit", movieUpdate);
    main.appendChild(section);
}

async function movieUpdate(event) {
    event.preventDefault();
    const form = event.target;
    const [ title, desc, img ] = form.getElementsByTagName("input");
    updateMovie(id, title.value, desc.value, img.value);
    alert("Updated thre Movie");
    displayHomepage();
}

export { initializeEditComponent, displayEdit };