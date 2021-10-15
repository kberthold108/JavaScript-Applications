import { cancelPost, desirializeForm, getAllTopics, createTopics } from "./helper.js";

async function postNewTopic(event) {
    event.preventDefault();
    const form = event.target.parentNode.parentNode;
    const data = desirializeForm(form);
    try {
        await fetch("http://localhost:3030/jsonstore/collections/myboard/posts", {
            method: "POST",
            body: JSON.stringify(data)
        });
    } catch(err) {
        alert(err);
    }
    form.reset();
    displayTopics();
}

let main;
let section;
function initializeTopicComponent(targetParent, targetSection) {
    main = targetParent;
    section = targetSection;
}

async function displayTopics() {
    main.innerHTML = "";
    main.appendChild(section);
    document.getElementById("cancelBtn").addEventListener("click", cancelPost);
    document.getElementById("postBtn").addEventListener("click", postNewTopic);

    const topics = await getAllTopics();
    if (!topics) {
        return;
    }
    for (const topic in topics) {
        main.appendChild(createTopics(topics[topic]));
    }
}

export { initializeTopicComponent, displayTopics, postNewTopic };