function loadCommits() {
	const gituserName = document.getElementById("username");
	const gitRepo = document.getElementById("repo");
	const commitList = document.getElementById("commits");

	fetch(`https://api.github.com/repos/${gituserName.value}/${gitRepo.value}/commits`)
		.then(response => {
			if (!response.ok) {
				throw Error(`Error ${response.status} (Not Found)`);
			}
			return response.json();
		})
		.then(data => {
			commitList.textContent = "";
			data.forEach(commit => {
				const li = document.createElement("li");
				li.textContent = `${commit.commit.author.name} ${commit.commit.message}`;
				commitList.appendChild(li);
			});
			console.log("Loaded content!");
		})
		.catch(err => {
			const li = document.createElement("li");
			li.textContent = err.message;
		});
}

async function loadCommitsAsync() {
	console.log("Async func");
	const gituserName = document.getElementById("username");
	const gitRepo = document.getElementById("repo");
	const commitList = document.getElementById("commits");

	try {
		const response = await fetch(`https://api.github.com/repos/${gituserName.value}/${gitRepo.value}/commits`);
		if (!response.ok) {
			throw Error(`Error ${response.status} (Not Found)`);
		}
		const data = await response.json();
		commitList.textContent = "";
		data.forEach(commit => {
			const li = document.createElement("li");
			li.textContent = `${commit.commit.author.name} ${commit.commit.message}`;
			commitList.appendChild(li);
		});
		console.log("Loaded content!");
	} catch (err) {
		const li = document.createElement("li");
		li.textContent = err.message;
	}
}