import page from "//unpkg.com/page/page.mjs";
import { setupCatalog } from "./catalog.js";
import { setupLogin, onLoginSubmit } from "./user/login.js";
import { setupRegister, onRegisterSubmit } from "./user/register.js";
import { setupCreate, onCreateSubmit } from "./createRecipe.js";
import { setupEdit, onEditSubmit } from "./editRecipe.js";
import { setupDetails } from "./recipeDetails.js";
import { changeNavigationState } from "./helpers.js";
import { logout } from "./user/logout.js";
import { createNav } from "./navigation.js";

window.addEventListener("load", async () => {
    changeNavigationState();

    const root = document.getElementById("app");
    const nav = document.getElementById("navbar");
    const navigation = createNav(root, nav);

    const views = {
        catalogView: navigation.registerView("catalog", setupCatalog, "catalogLink"),
        detailsView: navigation.registerView("details", setupDetails),
        loginView: navigation.registerView("login", setupLogin, "loginLink"),
        registerView: navigation.registerView("register", setupRegister, "registerLink"),
        createView: navigation.registerView("create", setupCreate, "createLink"),
        editView: navigation.registerView("edit", setupEdit),
    };

    page("/index.html", views.catalogView);
    page("/catalog", views.catalogView);
    page("/details/:id", views.detailsView);
    
    page("/register", views.registerView);
    navigation.registerForm("registerForm", onRegisterSubmit, () => { page.redirect("/catalog"); navigation.setUserNav(); });

    page("/login", views.loginView);
    navigation.registerForm("loginForm", onLoginSubmit, () => { page.redirect("/catalog"); navigation.setUserNav(); });

    page("/create", views.createView);
    navigation.registerForm("createForm", onCreateSubmit, (recipeId) => page.redirect("/details/" + recipeId));

    page("/edit/:id", views.editView);
    navigation.registerForm("editForm", onEditSubmit, (recipeId) => page.redirect("/details/" + recipeId));



    navigation.setUserNav();
    document.getElementById("logoutBtn").addEventListener("click", logoutClick);
    page();
    // Start application in catalog view


    async function logoutClick() {
        try {
            logout();
            navigation.setUserNav();
            page.redirect("/catalog");
        } catch (err) {
            alert(err.message);
        }
    }
});