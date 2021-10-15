import { initializeRegisterComponent } from "./user/register.js";
import { initializeLoginComponent } from "./user/login.js";
import { initializeHomepageComponent, displayHomepage } from "./homepage.js";
import { initializeNewMovieComponent } from "./newMovie.js";
import { initializeMovieDescriptionComponent } from "./movieDescription.js";
import { initializeEditComponent } from "./editMovie.js";
import { changeNavBar, applyNavBarFunctions } from "./helper.js";



const root = document.getElementById("main");
window.addEventListener("load", async () => {
    
    initializeRegisterComponent(root, document.getElementById("registerFormTemplate"));
    initializeLoginComponent(root, document.getElementById("loginFormTemplate"));
    initializeHomepageComponent(root, document.getElementById("homepage"));
    initializeNewMovieComponent(root, document.getElementById("addNewMovie"));
    initializeMovieDescriptionComponent(root, document.getElementById("movieDescription"));
    initializeEditComponent(root, document.getElementById("editMovie"));
    changeNavBar();
    applyNavBarFunctions();
    displayHomepage();

    document.getElementById("views").remove();
});
