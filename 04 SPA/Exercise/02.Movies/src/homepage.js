import { applyNavBarFunctions } from "./helper.js";
import { getAllMovies } from "./requests.js";
import { getMoviesTemplate } from "./templates/movies.js";
import { displayNewMovie } from "./newMovie.js";
import { displaMovieDescription } from "./movieDescription.js";

let main;
let section;
function initializeHomepageComponent(targetParent, targetSection) {
    main = targetParent;
    section = targetSection;
}

async function displayHomepage() {
    main.innerHTML = "";
    main.appendChild(section);
    applyNavBarFunctions();

    const movies = await getAllMovies();
    const moviesTemplate = getMoviesTemplate(movies);
    const movieList = section.querySelector("#movieList");

    if (movieList) {
        section.querySelector("#movies").removeChild(movieList);
    }
    section.querySelector("#movies").innerHTML += moviesTemplate;

    if(sessionStorage.token) {
        document.getElementById("addNewMovieBtn").style.display = "block";
    } else {
        document.getElementById("addNewMovieBtn").style.display = "none";
    }

    const buttons = Array.from(document.getElementsByTagName("button"));
    buttons[0].addEventListener("click", displayNewMovie);
    buttons.shift();
    buttons.forEach(x => {
        if (x.textContent === "Details"){
            x.addEventListener("click", displaMovieDescription);
        }
    });
}



export { initializeHomepageComponent, displayHomepage };