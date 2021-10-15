import { getRecipeById, createRecipeCard, createElement } from "./catalog.js";
import { editRecipe } from "./editRecipe.js";
import { deleteRecipe } from "./helpers.js";

let main;

let setNavActive;
function initializeDetailsComponent(targetParent, onNavChange) {
    main = targetParent;
    setNavActive = onNavChange;
}


async function displayDetails(recipe) {
    setNavActive("none");
    const fullRecipe = await getRecipeById(recipe._id);
    document.getElementById("app").innerHTML = "";
    const fullDetail = createRecipeCard(fullRecipe);
    if (fullRecipe._ownerId !== sessionStorage.getItem("userID")) {
        main.appendChild(fullDetail);
        return;
    }
    const deleteBtn = createElement("button", "deleteButton", "Delete");
    deleteBtn.name = [fullRecipe._ownerId, fullRecipe._id];
    deleteBtn.className = "controls";
    deleteBtn.addEventListener("click", deleteRecipe);
    fullDetail.appendChild(deleteBtn);
    const editBtn = createElement("button", "editButton", "Edit");
    editBtn.name = [fullRecipe._ownerId, fullRecipe._id];
    editBtn.className = "controls";
    editBtn.addEventListener("click", editRecipe);
    fullDetail.appendChild(editBtn);
    main.appendChild(fullDetail);

}

export { initializeDetailsComponent, displayDetails };