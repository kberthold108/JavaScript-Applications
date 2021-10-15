import { movieDesc } from "../../templates/movieDescriptionTemplate.js";
import { getMovieById, checkIfLiked, getMovieLikes } from "../../utils/requests.js";
import { removeMovie } from "../../utils/removeMovie.js";
import { displayEdit } from "./editMovie.js";
import { likeMovie } from "../../utils/likeMovie.js";
import { changeBtn } from "../../utils/helper.js";

let main;
let section;
function initializeMovieDescriptionComponent(targetParent, targetSection) {
    main = targetParent;
    section = targetSection;
}

let movId;
async function displaMovieDescription(event) {
    const { id } = event.target.parentNode.parentNode;
    movId = id;
    main.innerHTML = "";
    const movie = await getMovieById(id);
    section.innerHTML = movieDesc(movie);
    const movies = await getMovieLikes(movId);
    if (sessionStorage.token && sessionStorage.userID === movie._ownerId) {
        section.querySelector("#deleteBtn").style.display = "block";
        section.querySelector("#editBtn").style.display = "block";
        section.querySelector("#deleteBtn").addEventListener("click", removeMovie);
        section.querySelector("#editBtn").addEventListener("click", displayEdit);
        section.querySelector("#ownerLikes").textContent = `Likes ${movies.length}`;
        section.querySelector("#ownerLikes").style.display = "block";
    } else if (sessionStorage.token && sessionStorage.userID !== movie._ownerId) {
        section.querySelector("#likeBtn").addEventListener("click", likeMovie);
    }
    changeLikeBtn();
    main.appendChild(section);
}

async function changeLikeBtn() {
    const liked = await checkIfLiked(movId);
    const movieLikes = await getMovieLikes(movId);
    if (liked.length > 0) {
        changeBtn(`Liked ${movieLikes.length}`);
    } else {
        changeBtn("Like");
    }
}


export { initializeMovieDescriptionComponent, displaMovieDescription };