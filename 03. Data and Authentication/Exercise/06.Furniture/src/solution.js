import { createNewProduct } from "./createNewProduct.js";
if (sessionStorage.getItem("accessToken")) {
    const logOutBtn = document.getElementById("logoutBtn");
    logOutBtn.addEventListener("click", logout);

    const [form] = document.getElementsByTagName("form");
    form.addEventListener("submit", createNewProduct(form));
}

function logout() {
    sessionStorage.removeItem("accessToken");
    const newUrl = window.location.href.replace("homeLogged.html", "index.html");
    window.location.replace(newUrl);
}