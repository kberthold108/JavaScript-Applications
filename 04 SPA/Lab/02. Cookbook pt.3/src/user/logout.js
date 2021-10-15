const logoutUrl = "http://localhost:3030/users/logout";

async function logout() {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
        console.log("No access token!");
        return;
    }

    const response = await fetch(logoutUrl, {
        headers: {
            "X-Authorization": accessToken
        }
    });

    if(!response.ok) {
        //Handle bad response;
    }

    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userID");
    window.location.reload();
}

export { logout };