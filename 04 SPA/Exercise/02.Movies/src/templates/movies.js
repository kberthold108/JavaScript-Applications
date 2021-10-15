export const getMoviesTemplate = (movies) => {
    return `<div class="mt-4 row justify-content-md-center" id="movieList">${movies.map(movie => getMovieTemplate(movie)).join("")}</div>`;
};

const getMovieTemplate = (movie) => {
    return `<div class="card col-3 m-2 " style="width: 100%;" id="${movie._id}">
    <img class="card-img-top" src="${movie.img}" alt="Card image cap" width="500"/>
    <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
    </div>
    <div class="card-body">
        <button type="button" class="btn btn-primary">Details</button>
    </div>
</div>`;
};