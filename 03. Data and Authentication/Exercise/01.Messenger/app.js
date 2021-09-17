import { addNewMessage } from "./addNewMessage.js";
import { displayAllMessages } from "./displayAllMessages.js";

function getButtons() {
    const submitBtn = document.getElementById("submit");
    const refreshBtn = document.getElementById("refresh");
    submitBtn.addEventListener("click", addNewMessage);
    refreshBtn.addEventListener("click", displayAllMessages);
}

getButtons();
