// console.log("Before promise");


// new Promise(function (resolve, reject) {
//     setTimeout(function () {
//         reject("Something went wrong...");
//     }, 1000);
// }).then(res => console.log(res))
//     .catch(err => console.log(err));

// console.log("Continues to work...");

fetch("https://swapi.dev/api/people/1")
    .then(response => {
        if (response.status !== 200) {
            throw Error("You failed.");
        }
        return response.json();
    })
    .then(json => document.body.innerHTML = JSON.stringify(json))
    .catch(err => document.body.innerHTML = err);


fetch("https://api.github.com/repos/kberthold108/JavaScript-Applications/issues/", {
    method: "post",
    headers: { "Content-Type": "application/json", "Authorization": "token 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"},
    body: JSON.stringify({"title": "Updated from javascript"})
})
.then(response => response.json())
.then(json => document.body.innerHTML = JSON.stringify(json))
.catch(err => document.body.innerHTML = err);