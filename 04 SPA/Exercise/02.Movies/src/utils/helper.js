import { initializeLogoutComponent } from "../user/logout.js";
import { getNavigationTemplate } from "../templates/navigation.js";
import { displayLogin } from "../user/login.js";
import { displayRegister } from "../user/register.js";
import { displayHomepage } from "../components/homepage/homepage.js";

function changeNavBar() {
    const header = document.querySelector("header");
    header.innerHTML = "";
    const nav = getNavigationTemplate(sessionStorage.email);
    header.innerHTML = nav;

    if(sessionStorage.token) {
        initializeLogoutComponent();
    } 
}

function desirializeForm(form) {
    return Object.fromEntries([...new FormData(form).entries()]);
}

function clearForm(form) {
    form.reset();
}

function applyNavBarFunctions() {
    const links = {
        "navRegister": displayRegister,
        "navLogin": displayLogin,
        "navEmail": displayLogin,
        "navBarMovies": displayHomepage
    };
    Array.from(document.getElementById("navBar").getElementsByTagName("a")).forEach(x => x.addEventListener("click", links[x.id]));
}

function validateregisterInput(email, password, rePass) {
    if (email === "" || !email) {
        return false;
    }
    if (!password || password === "" || !rePass || rePass === "") {
        return false;
    }
    if (password !== rePass) {
        return false;
    }
    return true;
}

function validateInput([...args]) {
    let valid = true;
    args.forEach(x => {
        if (!x || x === "") {
            valid = false;
        }
    });
    return valid;
}


function checkLiked(liked) {
    if (!liked || liked.length === 0) {
        return false;
    } else {
        return true;
    }
}

function changeBtn(content) {
    document.getElementById("likeBtn").textContent = content;
}



export { changeNavBar, validateregisterInput , validateInput, applyNavBarFunctions, clearForm, desirializeForm, checkLiked, changeBtn };