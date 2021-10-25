import { getRecipeById } from "./catalog.js";
import { desirializeForm, displayMessage } from "./helpers.js";
import { html, render } from "https://unpkg.com/lit-html?module";

async function updateRecipe(id, body) {
    try {
        const response = await fetch(`http://localhost:3030/data/recipes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": sessionStorage.getItem("userToken")
            },
            body: JSON.stringify(body)
        });


        if (!response.ok) {
            displayMessage("Something went wrong...");
        }
    } catch (err) {
        displayMessage(err);
    }
}


const editTemplate = (recipe) => html`
<section id="create">
    <article>
        <h2>Edit Recipe</h2>
        <form id="editForm">
            <label>Name: <input type="text" name="name" placeholder="Recipe name" .value=${recipe.name}></label>
            <label>Image: <input type="text" name="img" placeholder="Image URL" .value=${recipe.img}></label>
            <label class="ml">Ingredients: <textarea name="ingredients"
                    placeholder="Enter ingredients on separate lines"
                    .value=${recipe.ingredients.join('\n')}></textarea></label>
            <label class="ml">Preparation: <textarea name="steps"
                    placeholder="Enter preparation steps on separate lines"
                    .value=${recipe.steps.join('\n')}></textarea></label>
            <input type="submit" value="Save Changes">
        </form>
    </article>
</section>`;


let recipeId;
export function setupEdit() {

    return displayEdit;
    async function displayEdit(context) {
        recipeId = context.params.id;
        const recipe = await getRecipeById(context.params.id);
        return editTemplate(recipe);
    }
}

export async function onEditSubmit(data, onSuccess) {
    
    const body = {
        name: data.name,
        img: data.img,
        ingredients: data.ingredients.split("\n").map(l => l.trim()).filter(l => l !== ""),
        steps: data.steps.split("\n").map(l => l.trim()).filter(l => l !== "")
    };

    try {
        await updateRecipe(recipeId, body);
        onSuccess(recipeId);
    } catch (err) {
        alert(err.message);
    }
}
