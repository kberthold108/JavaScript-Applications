import { initializeHomepageComponent, displayHomepage  } from "./components/homepage/homepage.js";
import { initializeRegisterComponent, displayRegister } from "./user/register.js";
import { initializeLoginComponent, displayLogin } from "./user/login.js";
import { initializeDashboardComponent, displayDashboard } from "./components/dashboard/dashboard.js";
import { initializeCreateComponent, displayCreateIdea } from "./components/createIdea/createIdea.js";
import { initializeDetailComponent } from "./components/dashboard/ideaDetail.js";
import { logout } from "./user/logout.js";

const links = {
    "registerLink": displayRegister,
    "logoutBtn": logout,
    "loginLink": displayLogin,
    "dashboardLink": displayDashboard,
    "createLink": displayCreateIdea
};


const root = document.getElementById("main");
window.addEventListener("load", async () => {
    initializeHomepageComponent(root, document.getElementById("home-page"));
    initializeRegisterComponent(root, document.getElementById("register-page"));
    initializeLoginComponent(root, document.getElementById("login-page"));
    initializeDashboardComponent(root, document.getElementById("dashboard-holder"));
    initializeDetailComponent(root, document.getElementById("details-page"));
    initializeCreateComponent(root, document.getElementById("create-page"));
    document.getElementById("views").remove();

    displayHomepage();
    document.getElementById("homeLink").addEventListener("click", displayHomepage);
    Array.from(document.getElementById("navbarResponsive").getElementsByTagName("a")).forEach(x => x.addEventListener("click", links[x.id]));
    
    
});
