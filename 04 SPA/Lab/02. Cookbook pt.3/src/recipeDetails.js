import page from '//unpkg.com/page/page.mjs';
import { getRecipeById } from "./catalog.js";
import { html } from "https://unpkg.com/lit-html?module";

const detailsTemplate = (recipe, isOwner, onDelete) => html`
<section id="details">
    ${recipeCard(recipe, isOwner, onDelete)}
</section>`;

const recipeCard = (recipe, isOwner, onDelete) => html`
<article>
    <h2>${recipe.name}</h2>
    <div class="band">
        <div class="thumb"><img src=${recipe.img}></div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredients.map(i => html`<li>${i}</li>`)}
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
        ${recipe.steps.map(s => html`<p>${s}</p>`)}
    </div>
    ${isOwner
        ? html`
        <div class="controls">
        <a class="actionLink" href=${"/edit/" + recipe._id}>\u270E Edit</a>
        <a class="actionLink" href="javascript:void(0)" @click=${onDelete}>\u2716 Delete</a>
    </div>`
        : ""}
</article>`;


export function setupDetails() {

    return displayDetails;

    async function displayDetails(context) {
        const fullRecipe = await getRecipeById(context.params.id);
        const userId = sessionStorage.getItem("userId");
        const isOwner = userId !== null && fullRecipe._ownerId === userId;
        return detailsTemplate(fullRecipe, isOwner, () => onDelete(fullRecipe));
    }

    async function onDelete(recipe) {
        console.log(recipe)
        const confirmed = confirm(`Are you sure you want to delete ${recipe.name}?`);
        if (!confirmed) {
            return;
        }
        try {
            await fetch(`http://localhost:3030/data/recipes/${recipe._id}`, {
                method: "DELETE",
                headers: {"X-Authorization": sessionStorage.getItem("userToken")}
            });
            page.redirect('/catalog');
        } catch(err) {
            console.log(err);
        } 
    }
}

