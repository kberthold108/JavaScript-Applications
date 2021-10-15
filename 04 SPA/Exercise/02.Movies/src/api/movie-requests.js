
async function getAllMovies() {
    try {
        const response = await fetch("http://localhost:3030/data/movies");
        return await response.json();
    } catch (err) {
        alert(err);
    }

}

async function postMovie(title, desc, img) {
    try {
        await fetch("http://localhost:3030/data/movies", {
            method: "POST",
            headers: {
                "X-Authorization": sessionStorage.token
            },
            body: JSON.stringify({
                "title": title,
                "description": desc,
                "img": img
            })
        });
    } catch (err) {
        alert(err);
    }
}

async function getMovieById(id) {
    try {
        const response = await fetch(`http://localhost:3030/data/movies/${id}`);
        return await response.json();
    } catch (err) {
        alert(err);
    }
}

async function deleteMovie(id) {
    try {
        await fetch(`http://localhost:3030/data/movies/${id}`, {
            method: "DELETE",
            headers: { "X-Authorization": sessionStorage.token }
        });
    } catch (err) {
        alert(err);
    }
}

async function updateMovie(id, title, desc, img) {
    try {
        await fetch(`http://localhost:3030/data/movies/${id}`, {
            method: "PUT",
            headers: { "X-Authorization": sessionStorage.token },
            body: JSON.stringify({
                title: title,
                description: desc,
                img: img
            })
        });
    } catch (err) {
        alert(err);
    }
}

async function addMovieLike(id) {
    try {
        await fetch("http://localhost:3030/data/likes", {
            method: "POST",
            headers: { "X-Authorization": sessionStorage.token },
            body: JSON.stringify({
                movieId: id
            })
        });
    } catch(err) {
        alert(err);
    }
}

async function deleteMovieLike(id) {
    try {
        await fetch(`http://localhost:3030/data/likes/${id}`, {
            method: "DELETE",
            headers: { "X-Authorization": sessionStorage.token },
        });
    } catch(err) {
        alert(err);
    }
}

async function getMovieLikes(id) {
    try {
        const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&`, {
            method: "GET",
            headers: { "X-Authorization": sessionStorage.token },
        });
        return await response.json();
    } catch(err) {
        alert(err);
    }
}

async function checkIfLiked(id) {
    try {
        const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${sessionStorage.userID}%22`);
        const data = await response.json();
        return data;
    } catch(err) {
        alert(err);
    }

}
export { getAllMovies, postMovie, getMovieById, deleteMovie, updateMovie, addMovieLike, checkIfLiked, deleteMovieLike, getMovieLikes };