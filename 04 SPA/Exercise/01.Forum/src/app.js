import { initializeTopicComponent, displayTopics } from "./topic.js";
import { initializeDetailComponent } from "./showDetail.js";
const root = document.getElementById("app");

window.addEventListener("load", async () => { 
    initializeTopicComponent(root, document.getElementById("newTopic"));
    initializeDetailComponent(root);
    document.getElementById("views").remove();
    root.innerHTML = "";
    
    displayTopics();
    document.getElementsByTagName("header")[0].getElementsByTagName("a")[0].addEventListener("click", displayTopics);
    
});