// import { displayCatalog } from "./catalog.js";
const displayMessage = (message) => alert(message);

function redirect(fromUrl, toUrl) {
    const newUrl = window.location.href.replace(fromUrl, toUrl);
    window.location.replace(newUrl);
}

function desirializeForm(form) {
    return Object.fromEntries([...new FormData(form).entries()]);
}

function elementFactory(type, attributes, ...content) {
    const result = document.createElement(type);

    for (const [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) === "on") {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e === "string" || typeof e === "number") {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}

function changeNavigationState() {

    if (sessionStorage.getItem("accessToken")) {
        document.getElementById("user").style.display = "inline-block";
        document.getElementById("guest").style.display = "none";
    } else {
        document.getElementById("guest").style.display = "inline-block";
        document.getElementById("user").style.display = "none";
    }
}

function createElement(type, id, textContent) {
    const created = document.createElement(type);
    created.id = id;
    created.textContent = textContent;
    return created;
}


async function deleteRecipe(event) {

    const [ownerID, recipeID] = event.target.name.split(",");

    if (ownerID !== sessionStorage.getItem("userID")) {
        return;
    }
    if (!window.confirm("delete?")) {
        return;
    }

    const response = await fetch(`http://localhost:3030/data/recipes/${recipeID}`, {
        method: "DELETE",
        headers: {
            "X-Authorization": sessionStorage.getItem("accessToken")
        }
    });
    if (!response.ok) {
        alert("Error");
    }
    document.getElementById("app").innerHTML = "";
    document.getElementById("app").innerHTML = "<p>Recipe deleted</p>";
}



export { redirect, desirializeForm, displayMessage, elementFactory, changeNavigationState, createElement, deleteRecipe };