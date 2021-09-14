function solution1() {
    const main = document.getElementById("main");

    fetch("http://localhost:3030/jsonstore/advanced/articles/list")
        .then(respons => {
            if (!respons.ok) {
                throw Error("Error");
            }
            return respons.json();
        })
        .then(data => {
            for (const thing of data) {

                const div = document.createElement("div");
                div.className = "accordion";

                const head = document.createElement("div");
                head.className = "head";
                const span = document.createElement("span");
                span.textContent = thing.title;
                head.appendChild(span);

                const btn = document.createElement("button");
                btn.className = "button";
                btn.id = thing._id;
                btn.textContent = "more";
                btn.addEventListener("click", clicked);
                head.appendChild(btn);
                div.appendChild(head);
                fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${thing._id}`)
                    .then(responss => {
                        if (!responss.ok) {
                            throw Error("Error");
                        }
                        return responss.json();
                    })
                    .then(detail => {
                        const extra = document.createElement("div");
                        extra.className = "extra";
                        const p = document.createElement("p");
                        p.textContent = detail.content;
                        extra.appendChild(p);
                        div.appendChild(extra);
                    });
                main.appendChild(div);
            }
        });

    function clicked(event) {
        const next = event.target.parentNode.nextSibling;

        if (next.style.display === "none" || next.style.display === "") {
            next.style.display = "block";
        } else {
            next.style.display = "none";
        }
    }
}

function creator(type, className, textContent = "", id = "") {
    const created = document.createElement(type);
    created.className = className;
    created.textContent = textContent;
    created.id = id;
    return created;
}

async function asyncSolution() {
    const main = document.getElementById("main");

    try {
        let data = await fetch("http://localhost:3030/jsonstore/advanced/articles/list");
        data = await data.json();
        for (const informations of data) {
            const div = creator("div", "accordion");
            const head = creator("div", "head");
            head.appendChild(creator("span", "", informations.title));
            const btn = creator("button", "button", "more", informations._id);
            btn.addEventListener("click", clicked);
            head.appendChild(btn);
            div.appendChild(head);

            try {
                let detail = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${informations._id}`);
                detail = await detail.json();
                const extra = creator("div", "extra");
                extra.appendChild(creator("p","", detail.content));
                div.appendChild(extra);
                main.appendChild(div);
            } catch(err) {
                console.log(err);
            }
        }
    } catch (err) {
        console.log(err);
    }

    function clicked(event) {
        const next = event.target.parentNode.nextSibling;

        if (next.style.display === "none" || next.style.display === "") {
            next.style.display = "block";
        } else {
            next.style.display = "none";
        }
    }
}

asyncSolution();