import { displayMessage } from "./helpers.js";
import { html } from "https://unpkg.com/lit-html?module";

const createURL = "http://localhost:3030/data/recipes";

const createTemplate = html`
<section id="create">
    <article>
        <h2>New Recipe</h2>
        <form id="createForm">
            <label>Name: <input type="text" name="name" placeholder="Recipe name"></label>
            <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
            <label class="ml">Ingredients: <textarea name="ingredients"
                    placeholder="Enter ingredients on separate lines"></textarea></label>
            <label class="ml">Preparation: <textarea name="steps"
                    placeholder="Enter preparation steps on separate lines"></textarea></label>
            <input type="submit" value="Create Recipe">
        </form>
    </article>
</section>`;



export function setupCreate() {
    return displayCreate;
    function displayCreate() {
        return createTemplate;
    }
}
export async function onCreateSubmit(data, onSuccess) {
    const body = {
        name: data.name,
        img: data.img,
        ingredients: data.ingredients.split("\n").map(l => l.trim()).filter(l => l != ""),
        steps: data.steps.split("\n").map(l => l.trim()).filter(l => l !== "")
    };


    const result = await createRecipe(body);
    onSuccess(result._id);
}

async function createRecipe(body) {

    try {
        const response = await fetch(createURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": sessionStorage.getItem("userToken")
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            displayMessage("Something went wrong...");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        displayMessage(err);
    }
}
