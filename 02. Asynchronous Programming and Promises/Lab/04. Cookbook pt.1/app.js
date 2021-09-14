async function solution() {
	let data = await fetch("http://localhost:3030/jsonstore/cookbook/recipes");
	data = await data.json();

	for (const recipe in data) {
		const article = creator("article", "preview");
		const title = creator("div", "title");
		title.appendChild(creator("h2", "", data[recipe].name));
		article.appendChild(title);
		const pic = creator("div", "small");
		const img = creator("img", "", "", data[recipe].img);
		pic.appendChild(img);
		article.appendChild(pic);
		article.addEventListener("click", clicked);
		document.getElementsByTagName("main")[0].appendChild(article);
	}
}

async function clicked(event) {
	let recipe;
	const [name] = event.target.getElementsByTagName("h2");
	try {
		let data = await fetch("http://localhost:3030/jsonstore/cookbook/details/");
		data = await data.json();
		for (const recip in data) {
			if (data[recip].name === name.textContent) {
				recipe = data[recip]._id;
				break;
			}
		}
		
		let details = await fetch(`http://localhost:3030/jsonstore/cookbook/details/${recipe}`);
		details = await details.json();
		event.target.removeAttribute = "preview";
		
		creator("h1", "", details.name);
		const parentDiv = creator("div", "band");
		const imgDiv = creator("div", "thumb");
		imgDiv.appendChild(creator("img", "", "", details.img));
		parentDiv.appendChild(imgDiv);
		const ingredientsDiv = creator("div", "ingredients");
		ingredientsDiv.appendChild(creator("h3", "", "Ingredients:"));
		const ul = creator("ul");
		
		details.ingredients.forEach(ing => {
			ul.appendChild(creator("li", "", ing));
		});
		ingredientsDiv.appendChild(ul);
		parentDiv.appendChild(ingredientsDiv);
		const articleShow = document.createElement("article");
		articleShow.appendChild(creator("h1", "", details.name));
		articleShow.appendChild(parentDiv);	

		const descriptionDiv = creator("div", "description");
		descriptionDiv.appendChild(creator("h3", "", "Preparation:"));
		details.steps.forEach(step => {
			descriptionDiv.appendChild(creator("p", "", step));
		});
		articleShow.appendChild(descriptionDiv);
		event.target.textContent = "";
		event.target.replaceWith(articleShow);
	} catch(err) {
		console.log(err);
	}
}

function creator(type, className = "", textContent = "", src = "") {
	const created = document.createElement(type);
	created.className = className;
	created.textContent = textContent;
	created.src = src;
	return created;
}

solution();
