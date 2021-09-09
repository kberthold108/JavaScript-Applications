function loadRepos() {
	const input = document.getElementById("username");
	const ul = document.getElementById("repos");

	fetch(`https://api.github.com/users/${input.value}/repos`)
		.then(response => {
			ul.textContent = "";
			if (!response.ok) {
				throw Error("Something went wrong...");
			}
			return response.json();
		})
		.then(json => {
			json.forEach(repo => {
				const li = document.createElement("li");
				const a = document.createElement("a");
				a.href = repo.html_url;
				a.textContent = repo.full_name;
				li.appendChild(a);
				ul.appendChild(li);
			});
		}).catch(err => {
			const li = document.createElement("li");
			li.textContent = err;
			ul.appendChild(li);
		});
}

async function loadReposAsync() {
	const input = document.getElementById("username");
	const ul = document.getElementById("repos");


	try {
		const response = await fetch(`https://api.github.com/users/${input.value}/repos`);

		if (!response.ok) {
			throw Error("Something went wrong...");
		}

		const data = await response.json();
		data.forEach(repo => {
			const li = document.createElement("li");
			const a = document.createElement("a");
			a.href = repo.html_url;
			a.textContent = repo.full_name;
			li.appendChild(a);
			ul.appendChild(li);
		});

	} catch (err) {
		const li = document.createElement("li");
		li.textContent = err;
		ul.appendChild(li);
	}
}