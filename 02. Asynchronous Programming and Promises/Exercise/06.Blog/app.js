function solution() {
    const loadposts = document.getElementById("btnLoadPosts");
    loadposts.addEventListener("click", loadPosts);
    const viewPostBtn = document.getElementById("btnViewPost");
    viewPostBtn.addEventListener("click", viewPost);
}

function loadPosts() {
    fetch("http://localhost:3030/jsonstore/blog/posts")
        .then(response => {
            if (!response.ok) {
                throw Error("Error");
            }
            return response.json();
        })
        .then(data => {
            for (const post in data) {
                const opt = document.createElement("option");
                opt.value = post;
                opt.textContent = data[post].title;
                document.getElementById("posts").appendChild(opt);
            }
        });
}

function viewPost() {
    const posts = document.getElementById("posts");

    fetch(`http://localhost:3030/jsonstore/blog/posts/${posts.value}`)
    .then(responses => {
        if (!responses.ok) {
            throw Error("Error");
        }
        return responses.json();
    })
    .then(postDetail => {
        document.getElementById("post-title").textContent = postDetail.title;
        document.getElementById("post-body").textContent = postDetail.body;
    })
    .catch(err => {
        console.log(err.message);
    });

    fetch("http://localhost:3030/jsonstore/blog/comments/")
        .then(response => {
            if (!response.ok) {
                throw Error("Error");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("post-comments").textContent = "";
            for (const comment in data) {
                const li = document.createElement("li");
                li.textContent = data[comment].text;
                document.getElementById("post-comments").appendChild(li);
            }
        })
        .catch(err => {
            console.log(err.message);
        });
}
solution();