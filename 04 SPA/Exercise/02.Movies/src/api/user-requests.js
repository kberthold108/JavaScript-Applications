import { changeNavBar } from "../utils/helper.js";

export async function userAuth(email, password, type) {
    try {
        const response = await fetch(type, {
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
        if (!response.ok) {
            throw Error();
        }
        const data = await response.json();
        sessionStorage.setItem("token", data.accessToken);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("userID", data._id);
        changeNavBar();

    } catch (err) {
        console.log(err);
        alert("There was an Error: " + err.message);
    }
}