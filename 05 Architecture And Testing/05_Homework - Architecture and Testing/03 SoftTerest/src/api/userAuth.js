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
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("email", email);
        localStorage.setItem("userID", data._id);
    } catch (err) {
        console.log(err);
        alert("There was an Error: " + err.message);
    }
}