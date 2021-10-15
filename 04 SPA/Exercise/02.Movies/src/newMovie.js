import { postMovie } from "./requests.js";
import { clearForm, validateInput } from "./helper.js";
import { displayHomepage } from "./homepage.js";
let main;
let section;
function initializeNewMovieComponent(targetParent, targetSection) {
    main = targetParent;
    section = targetSection;
}

function displayNewMovie(event) {
    event.preventDefault();
    main.innerHTML = "";
    main.appendChild(section);
    document.getElementById("addNewMovieForm").addEventListener("submit", newMovie);
}

async function newMovie(event) {
    event.preventDefault();
    const [title, desc, imgSrc] = event.target.getElementsByTagName("input");
    if (!validateInput(title.value, desc.value, imgSrc.value)) {
        alert("Error");
        return;
    }
    await postMovie(title.value, desc.value, imgSrc.value);
    clearForm(event.target);
    displayHomepage();
}

export { initializeNewMovieComponent, displayNewMovie };