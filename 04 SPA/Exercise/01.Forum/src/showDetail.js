import { createDetailTopic, newCommentForm, postNewComment } from "./helper.js";
import { displayComments } from "./loadComments.js"
let main;
function initializeDetailComponent(targetParent) {
    main = targetParent;
}

async function showDetail(event) {
    main.innerHTML = "";
    const thing = (event.currentTarget)
    const { id } = event.currentTarget;
    const temp = await createDetailTopic(id);
    const wrapper = document.createElement("div");
    wrapper.className = "comment";
    wrapper.innerHTML += temp;
    main.appendChild(wrapper);
    main.innerHTML += (newCommentForm());
    document.getElementById("postNewCommentBtn").addEventListener("click", postNewComment);
    
    displayComments(thing);
}

export { showDetail, initializeDetailComponent };