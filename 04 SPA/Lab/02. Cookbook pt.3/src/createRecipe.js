import { desirializeForm, displayMessage } from "./helpers.js";
import { displayCatalog } from "./catalog.js";

const createURL = "http://localhost:3030/data/recipes";

async function onSubmit(event) {
    event.preventDefault();
    await createRecipe(event.target);
    displayCatalog();
}

async function createRecipe(form) {
    let { img, ingredients, name, steps } = desirializeForm(form);

    ingredients = ingredients.split("\r\n");
    steps = steps.split("\r\n");
    try {
        const response = await fetch(createURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": sessionStorage.getItem("accessToken")
            },
            body: JSON.stringify({ img, ingredients, steps, name })
        });

        if (!response.ok) {
            displayMessage("Something went wrong...");
        }
    } catch (err) {
        displayMessage(err);
    }
}

let main;
let section;
let setNavActive;

function initializeCreateComponent(targetParent, targetSection, onNavChange) {
    main = targetParent;
    section = targetSection;
    setNavActive = onNavChange;
    section.querySelector("form").addEventListener("submit", onSubmit);
}

function displayCreate() {
    setNavActive("createLink");
    main.innerHTML = "";
    main.appendChild(section);
}

export { initializeCreateComponent, displayCreate };