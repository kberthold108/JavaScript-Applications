function loadRepos() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://swapi.dev/api/people/1");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Got result from star wars!");
            document.querySelector("#res").innerHTML += xhr.responseText;
        } else if (xhr.readyState !== 4) {
            // document.querySelector("#res").innerHTML = "Loading...Please wait and don't spam the button :)";
        } else if (xhr.status >= 400) {
            // document.querySelector("#res").innerHTML = "ERROR! Something went wrong...";
        }
    };
    xhr.send();


    const xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "https://api.github.com/users/testnakov/repos");
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4 && xhr2.status === 200) {
            console.log("Got result from github!");
            document.querySelector("#res").innerHTML += xhr2.responseText;
        } else if (xhr2.readyState !== 4) {
            // document.querySelector("#res").innerHTML = "Loading...Please wait and don't spam the button :)";
        } else if (xhr2.status >= 400) {
            // document.querySelector("#res").innerHTML = "ERROR! Something went wrong...";
        }
    };
    xhr2.send();

    console.log("Something more is executing");
    const result = sum(1, 2);
    console.log(result);

    function sum(a, b) {
        return a + b;
    }
}