import { elementFactory, createElement, deleteRecipe } from "./helpers.js";
import { editRecipe } from "./editRecipe.js";
import { displayDetails } from "./recipeDetails.js";

async function getRecipes() {
    const response = await fetch("http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg");
    const recipes = await response.json();

    return Object.values(recipes);
}

async function getRecipeById(id) {
    const response = await fetch(`http://localhost:3030/data/recipes/${id}`);
    const recipe = await response.json();

    return recipe;
}

function createRecipePreview(recipe) {
    const result = elementFactory("article", { className: "preview", onClick: toggleCard },
        elementFactory("div", { className: "title" }, elementFactory("h2", {}, recipe.name)),
        elementFactory("div", { className: "small" }, elementFactory("img", { src: recipe.img })),
    );

    return result;

    async function toggleCard() {
        displayDetails(recipe);
    }
}

function createRecipeCard(recipe) {
    const result = elementFactory("article", {},
        elementFactory("h2", {}, recipe.name),
        elementFactory("div", { className: "band" },
            elementFactory("div", { className: "thumb" }, elementFactory("img", { src: recipe.img })),
            elementFactory("div", { className: "ingredients" },
                elementFactory("h3", {}, "Ingredients:"),
                elementFactory("ul", {}, recipe.ingredients.map(i => elementFactory("li", {}, i))),
            )
        ),
        elementFactory("div", { className: "description" },
            elementFactory("h3", {}, "Preparation:"),
            recipe.steps.map(s => elementFactory("p", {}, s))
        ),
    );

    return result;
}


let main;
let section;
let setNavActive;

function initilizeCatalogComponent(targetParent, targetSection, onNavChange) {
    main = targetParent;
    section = targetSection;
    setNavActive = onNavChange;
}

async function displayCatalog() {
    setNavActive("catalogLink");
    main.innerHTML = "";
    section.innerHTML = "Loading...";
    main.appendChild(section);

    const recipes = await getRecipes();
    const cards = recipes.map(createRecipePreview);

    section.innerHTML = "";
    cards.forEach(c => main.appendChild(c));
}


export { initilizeCatalogComponent, displayCatalog, getRecipeById, createRecipeCard, createElement };