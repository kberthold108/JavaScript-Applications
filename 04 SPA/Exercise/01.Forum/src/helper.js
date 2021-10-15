import { showDetail } from "./showDetail.js";
import { displayTopics } from "./topic.js";
function cancelPost(event) {
    event.preventDefault();
    const form = event.target.parentNode.parentNode;
    form.reset();
}

function desirializeForm(form) {
    return Object.fromEntries([...new FormData(form).entries()]);
}

async function getAllTopics() {
    try {
        const response = await fetch("http://localhost:3030/jsonstore/collections/myboard/posts");
        if (!response.ok) {
            throw Error();
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

function createTopics(topic) {

    const wrapper = document.createElement("div");
    wrapper.classList = "topic-name-wrapper";
    wrapper.id = topic._id;
    wrapper.innerHTML = `<div class="topic-name">
            <h2>${topic.title}</h2>
        </div>
        <div class="topic-name">
            <p>Username: ${topic.username}</p>
        </div>`;
    wrapper.addEventListener("click", showDetail);
    return wrapper;
}

async function createDetailTopic(id) {
    const data = await getTopicDetail(id);
    const template = `
                        <div class="header" id="${id}">
                            <img src="./static/profile.png" alt="avatar">
                            <p><span>${data.username}</span> posted on Date</p>
                            <p class="post-content">${data.post}</p>
                        </div>
                    `;
    return template;
}

async function getTopicDetail(id) {
    try {
        const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`);
        const data = await response.json();

        return data;
    } catch (err) {
        console.log(err);
    }
}

async function createCommentList(id) {
    const data = await getAllComments();

    const arr = [];
    for (const comment in data) {
        if (data[comment].postID === id) {
            arr.push(`
            <div class="topic-name-wrapper">
                <div class="topic-name">
                    <p><strong>${data[comment].username}<strong> commented on Date</p>
                    <div class="post-content">
                        <p>${data[comment].content}</p>
                    </div>
                </div>
            </div>
        `);
        }
    }
    return arr;
}

function newCommentForm() {
    const template = `<div class="answer-comment">
                    <p><span>currentUser</span> comment</p>
                        <div class="answer">
                            <form>
                                <textarea name="newComment" id="newCommentContent" cols="30" rows="10"></textarea>
                                <label>Username</label>
                                <input type="text" id="newCommentUsername">
                            </form>
                            <button id="postNewCommentBtn">Post</button>
                        </div>
                        </div>`;
    return template;
}

async function getAllComments() {
    try {
        const response = await fetch("http://localhost:3030/jsonstore/collections/myboard/comments");
        const data = await response.json();

        return data;
    } catch (err) {
        console.log(err);
    }
}

async function postNewComment(event) {
    event.preventDefault();

    const id = document.getElementsByClassName("header")[0].id;
    const newCommentContent = document.getElementById("newCommentContent");
    const newCommentUsername = document.getElementById("newCommentUsername");

    try {
        const response = await fetch("http://localhost:3030/jsonstore/collections/myboard/comments", {
            method: "POST",
            body: JSON.stringify({
                "postID": id,
                "username": newCommentUsername.value,
                "content": newCommentContent.value
            })
        });

        if (!response.ok) {
            throw Error();
        }
    } catch (err) {
        console.log(err);
    }
    event.target.parentNode.getElementsByTagName("form")[0].reset();
    alert("U commented lol");
    displayTopics();
}

export { cancelPost, desirializeForm, getAllTopics, createTopics, createDetailTopic, getAllComments, newCommentForm, postNewComment, createCommentList };