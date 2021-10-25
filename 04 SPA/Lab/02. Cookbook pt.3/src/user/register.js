import { desirializeForm, displayMessage } from "../helpers.js";
import { login } from "./login.js";
import { html } from "https://unpkg.com/lit-html?module";

const registerUrl = "http://localhost:3030/users/register";

const registerTemplate =  html`
<section id="register">
    <article>
        <h2>Register</h2>
        <form id="registerForm">
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="rePass"></label>
            <input type="submit" value="Register">
        </form>
    </article>
</section>`;

export function setupRegister() {
    return displayRegister;

    function displayRegister() {
        return registerTemplate;
    }
}
export async function onRegisterSubmit(data, onSuccess) {
        if (data.password !== data.rePass) {
            displayMessage("Form not valid...");
        }
        await login(registerUrl, {email: data.email, password: data.password});
        onSuccess();
    }


