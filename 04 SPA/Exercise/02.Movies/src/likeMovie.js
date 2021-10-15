import { addMovieLike, checkIfLiked, deleteMovieLike, getMovieLikes } from "./requests.js";
import { checkLiked, changeBtn } from "./helper.js";

async function likeMovie(event) {
    event.preventDefault();
    const { id } = event.target.parentNode;
    const liked = await checkIfLiked(id);

    if (!checkLiked(liked)) {
        await addMovieLike(id);
        const movieLikes = await getMovieLikes(id);
        changeBtn(`Liked ${movieLikes.length}`);
    } else {
        deleteMovieLike(liked[0]._id);
        changeBtn("Like");
    }
}


export { likeMovie };