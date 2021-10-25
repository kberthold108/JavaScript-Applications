const logoutUrl = "http://localhost:3030/users/logout";

function logout() {
    const accessToken = sessionStorage.getItem("userToken");

    if (!accessToken) {
        console.log("No access token!");
        return;
    }
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("userId");
}

export { logout };