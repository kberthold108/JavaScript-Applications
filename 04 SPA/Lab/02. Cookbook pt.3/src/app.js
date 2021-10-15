import { initilizeCatalogComponent, displayCatalog } from "./catalog.js";
import { initializeLoginComponent, displayLogin } from "./user/login.js";
import { initializeRegisterComponent, displayRegister } from "./user/register.js";
import { initializeCreateComponent, displayCreate } from "./createRecipe.js";
import { initilizeEditComponent } from "./editRecipe.js";
import { initializeDetailsComponent, displayDetails } from "./recipeDetails.js";
import { changeNavigationState } from "./helpers.js";
import { logout } from "./user/logout.js";


window.addEventListener("load", async () => {
    changeNavigationState();

    const root = document.getElementById("app");
    const nav = document.getElementById("navbar");

    // Initialize components
    initilizeCatalogComponent(root, document.getElementById("catalog"), setNavActive);
    initializeLoginComponent(root, document.getElementById("login"), setNavActive);
    initializeRegisterComponent(root, document.getElementById("register"), setNavActive);
    initializeCreateComponent(root, document.getElementById("create"), setNavActive);
    initilizeEditComponent(root, document.getElementById("edit"), setNavActive);
    initializeDetailsComponent(root, setNavActive);
    document.getElementById("views").remove();

    const link = {
        "catalogLink": displayCatalog,
        "createLink": displayCreate,
        "loginLink": displayLogin,
        "registerLink": displayRegister,
        "logoutBtn": logout
    };

    nav.addEventListener("click", (ev) => {
        const handler = link[ev.target.id];
        if(!handler) {
            return;
        }
        handler();
    });

    // Display our home page
    displayCatalog();

    function setNavActive(targetId) {
        Array.from(nav.getElementsByTagName("a"))
            .forEach(link => link.id === targetId ? link.classList.add("active") : link.classList.remove("active"));
    }
});