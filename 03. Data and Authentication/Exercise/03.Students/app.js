import { createNewStudent } from "./createNewStudent.js";
function getButton() {
    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();
        createNewStudent();
    });
}

getButton();