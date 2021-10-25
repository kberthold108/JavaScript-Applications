function validateRegisterInput(email, password, rePass) {
    if (!email || email === "" || email.length < 3) {
        return false;
    }
    if (!password || password === "" || password.length < 3) {
        return false;
    }
    if (password !== rePass) {
        return false;
    }
    return true;
}
function validateLoginInput(email, password) {
    if (!email || email === "" || email.length < 3) {
        return false;
    }
    if (!password || password === "" || password.length < 3) {
        return false;
    }
    return true;
}

function validateCreateInput(title, desc, img) {
    if (title.length < 6) {
        return false;
    }
    if (desc.length < 10) {
        return false;
    }
    if (img.length < 5) {
        return false;
    }
    return true;
}

function changeNavBar() {
    if(!localStorage.token) {
        document.getElementById("createLi").style.display = "none";
        document.getElementById("logoutLi").style.display = "none";
        document.getElementById("loginLi").style.display = "block";
        document.getElementById("registerLi").style.display = "block";
    } else {
        document.getElementById("createLi").style.display = "block";
        document.getElementById("logoutLi").style.display = "block";
        document.getElementById("loginLi").style.display = "none";
        document.getElementById("registerLi").style.display = "none";
    }
}

function resetForm(form) {
    form.reset();
}

export { validateRegisterInput, changeNavBar, validateLoginInput, resetForm, validateCreateInput };