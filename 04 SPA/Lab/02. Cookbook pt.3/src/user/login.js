import { displayMessage, changeNavigationState } from "../helpers.js";
import { html } from "https://unpkg.com/lit-html?module";

const loginURL = "http://localhost:3030/users/login";
async function login(url, body) {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const responseText = JSON.parse(await response.text());
        displayMessage(responseText.message);
        return false;
    }

    const data = await response.json();
    sessionStorage.setItem("userToken", data.accessToken);
    sessionStorage.setItem("userId", data._id);

    changeNavigationState();
    return true;
}

const loginTemplate = html`
<section id="login">
    <article>
        <h2>Login</h2>
        <form id="loginForm">
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input type="submit" value="Login">
        </form>
    </article>
</section>`;


export function setupLogin() {
    return displayLogin;
    function displayLogin() {
        return loginTemplate;
    }
}
export async function onLoginSubmit(data, onSuccess) {
    await login(loginURL, { email: data.email, password: data.password });
    onSuccess();
    
}






export { login };

