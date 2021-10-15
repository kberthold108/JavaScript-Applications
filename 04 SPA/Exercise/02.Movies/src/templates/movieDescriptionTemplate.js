 export const movieDesc = (movie) => {
    return `<h2 class="text-dark">Movie Title: ${movie.title}</h2>
    <div class="row">
        <div class="col">
            <img class="mr-4" src=${movie.img}>
        </div>
        <div class="ml-5 col">
            <h5 class="text-center">Movie Description</h5>
            <p class="text-center">${movie.description}</p>
            <div class="row justify-content-center" id=${movie._id}>
                <button type="button" class="btn btn-danger" id="deleteBtn" style="display: none;">Delete</button>
                <button type="button" class="btn btn-warning" id="editBtn" style="display: none;">Edit</button>
                <button type="button" class="btn btn-primary" id="likeBtn">Like</button>
                <p style="display: none;" id="ownerLikes">Likes</p>
            </div>
        </div>
    </div>`;
};