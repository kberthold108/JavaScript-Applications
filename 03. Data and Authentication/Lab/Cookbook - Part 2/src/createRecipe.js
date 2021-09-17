import { desirializeForm, redirect, displayMessage } from "./helpers.js";

const createURL = "http://localhost:3030/data/recipes";

async function onSubmit(event) {
    event.preventDefault();
    await createRecipe(event.target);
    redirect("create.html", "index.html");
}

async function createRecipe(form) {
    const { img, ingredients, name, steps } = desirializeForm(form);


    console.log(img, ingredients, name, steps);
    const splitIngridients = ingredients.split("\r\n");
    const splitSteps = steps.split("\r\n");
    try {
        const response = await fetch(createURL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "X-Authorization": sessionStorage.getItem("accessToken") 
            },
            body: JSON.stringify({ img, splitIngridients, splitSteps, name })
        });
        
        if (!response.ok) {
           displayMessage("Something went wrong...");
        }
    } catch(err) {
        displayMessage(err);
    }

}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form").addEventListener("submit", onSubmit);
});