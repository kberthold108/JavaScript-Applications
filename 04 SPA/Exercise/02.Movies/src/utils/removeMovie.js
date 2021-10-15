import { deleteMovie } from "./requests.js";
import { displayHomepage } from "../components/homepage/homepage.js";

async function removeMovie(event) {
    event.preventDefault();
    const { id } = event.target.parentNode;
    const confirmed = confirm("Delete this Movie?");
    if (!confirmed) {
        return;
    }
    deleteMovie(id);  
    alert("Successfully deleted");
    displayHomepage();
}

export { removeMovie };