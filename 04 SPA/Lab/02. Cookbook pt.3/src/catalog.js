import { html, render } from "https://unpkg.com/lit-html?module";
import { elementFactory, createElement } from "./helpers.js";

async function getRecipes() {
    const response = await fetch("http://localhost:3030/data/recipes");
    const recipes = await response.json();

    return Object.values(recipes);
}

async function getRecipeById(id) {
    const response = await fetch(`http://localhost:3030/data/recipes/${id}`);
    const recipe = await response.json();
    return recipe;
}
const catalogTemplate = (recipes) => html`
<section id="catalog">
    ${recipes.map(r => recipePreview(r))}
</section>`;

const recipePreview = (recipe) => html`<a class="card" href="/details/${recipe._id}">
<article class="preview" >
    <div class="title">
        <h2>${recipe.name}</h2>
    </div>
    <div class="small"><img src=${recipe.img}></div>
</article>
</a>`;


export function setupCatalog() {

    return displayCatalog;
    async function displayCatalog() {
        const recipes = await getRecipes();
        return catalogTemplate(recipes);
    }
}


export { getRecipeById, createElement };