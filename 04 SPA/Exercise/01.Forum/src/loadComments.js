import { createCommentList } from "./helper.js";

async function displayComments(comm) {
    const { id } = comm;
    const data = await createCommentList(id);
    const [display] = document.getElementsByClassName("comment");

    for (const comment of data) {
        const div = document.createElement("div");
        div.innerHTML = comment;
        display.appendChild(div);
    }
}

export { displayComments };