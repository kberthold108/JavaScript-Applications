
import { desirializeForm, displayMessage } from "./helpers.js";
let form;
let id;
function editRecipe(event) {
    
    const parent = event.target.parentNode;

    const [ownerID, recipeID] = event.target.name.split(",");
    id = recipeID;

    if (ownerID !== sessionStorage.getItem("userID")) {
        return;
    }
    displayEdit();
    document.getElementsByName("name")[0].value = parent.getElementsByTagName("h2")[0].textContent;
    document.getElementsByName("img")[0].value = parent.getElementsByTagName("img")[0].src;
    const [ingret] = parent.getElementsByClassName("ingredients");
    const [ul] = ingret.getElementsByTagName("ul");
    console.log(document.getElementsByName("ingredients")[0].value)
    Array.from(ul.children).forEach(x => document.getElementsByName("ingredients")[0].value += `${x.textContent}\n`);
    console.log(document.getElementsByName("ingredients")[0].value)

    
    
    
    const [desc] = parent.getElementsByClassName("description");
    const p = Array.from(desc.children);
    p.shift();
    p.forEach(x => document.getElementsByName("steps")[0].value += `${x.textContent}\n`);

    const [currForm] = document.getElementById("edit").getElementsByTagName("form");

    form = currForm;
    document.getElementById("edit").addEventListener("submit", updateRecipe);
}

async function updateRecipe(event) {
    let { img, ingredients, name, steps } = desirializeForm(form);
    ingredients = ingredients.split("\r\n");
    steps = steps.split("\r\n");
    try {
        const response = await fetch(`http://localhost:3030/data/recipes/${id}`, {
            method: "PUT",
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

function initilizeEditComponent(targetParent, targetSection, onNavChange) {
    main = targetParent;
    section = targetSection;
    setNavActive = onNavChange;
}

function displayEdit() {
    main.innerHTML = "";
    main.appendChild(section);
}

export { editRecipe, initilizeEditComponent, displayEdit };