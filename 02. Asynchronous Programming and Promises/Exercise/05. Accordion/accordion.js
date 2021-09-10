function solution() {
	const main = document.getElementById("main");

    fetch("http://localhost:3030/jsonstore/advanced/articles/list")
    .then(respons => {
        if(!respons.ok) {
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
                    if(!responss.ok) {
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
        
        if(next.style.display === "none" || next.style.display === "") {
            next.style.display = "block";
        } else {
            next.style.display = "none";
        }
    }
}

solution();