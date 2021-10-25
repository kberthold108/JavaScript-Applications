export async function getAllIdeas() {
    try {
        const response = await fetch("http://localhost:3030/data/ideas");
        if (!response.ok) {
            throw Error();
        }
        const data = await response.json();
        return data;
    } catch(err) {
        alert(err);
    }
}

export async function getIdeaById(id) {
    try {
        const response = await fetch(`http://localhost:3030/data/ideas/${id}`);
        if (!response.ok) {
            throw Error();
        }
        const data = await response.json();
        return data;
    } catch(err) {
        alert(err);
    }
}

export async function deleteIdea(id) {
    try {
         await fetch(`http://localhost:3030/data/ideas/${id}`, {
            method: "DELETE",
            headers: {
                "X-Authorization": localStorage.token
            }
        });
        
    } catch(err) {
        alert(err);
    }
}

export async function createIdea(title, description, img) {
    try {
        const response = await fetch("http://localhost:3030/data/ideas", {
            method: "POST",
            headers: {
                "X-Authorization": localStorage.token
            },
            body: JSON.stringify({
                title: title,
                description: description,
                img: img
            })
        });
        if (!response.ok) {
            throw Error();
        }
    } catch(err) {
        alert(err);
    }
}