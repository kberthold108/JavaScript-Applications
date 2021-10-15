import { initializeRegisterComponent } from "./user/register.js";
import { initializeLoginComponent } from "./user/login.js";
import { initializeHomepageComponent, displayHomepage } from "./components/homepage/homepage.js";
import { initializeNewMovieComponent } from "./components/movie/newMovie.js";
import { initializeMovieDescriptionComponent } from "./components/movie/movieDescription.js";
import { initializeEditComponent } from "./components/movie/editMovie.js";
import { changeNavBar, applyNavBarFunctions } from "./utils/helper.js";



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
