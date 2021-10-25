import { displayHomepage  } from "../components/homepage/homepage.js";
export function logout(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userID");
    displayHomepage();
}