import { changeNavBar, applyNavBarFunctions } from "../utils/helper.js";
import { displayHomepage } from "../components/homepage/homepage.js";

function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    changeNavBar();
    applyNavBarFunctions();
    displayHomepage();
}

function initializeLogoutComponent() {
    document.getElementById("navLogout").addEventListener("click", logout);
}

export { initializeLogoutComponent };