const displayMessage = (message) => alert(message);

function redirect(fromUrl, toUrl) {
    const newUrl = window.location.href.replace(fromUrl, toUrl);
    window.location.replace(newUrl);
}

function desirializeForm(form) {
    return Object.fromEntries([...new FormData(form).entries()]);
}

export { redirect, desirializeForm, displayMessage };