function solution1() {

    const container = document.getElementById("container");

    fetch("http://localhost:3030/jsonstore/advanced/profiles")
        .then(response => {
            if (!response.ok) {
                throw Error("Error");
            }

            return response.json();
        })
        .then(data => {

            for (const dude in data) {

                // Shit
                // const profile = document.createElement("div");
                // profile.className = "profile";
                // const img = document.createElement("img");
                // img.src = "./iconProfile2.png";
                // img.className = "userIcon";
                // profile.appendChild(img);
                // const label = document.createElement("label");
                // label.textContent = "Lock";
                // profile.appendChild(label);
                // const input = document.createElement("input");
                // input.type = "radio";
                // input.name = "user1Locked";
                // input.value = "lock";
                // input.checked = true;
                // profile.appendChild(input);
                // const label1 = document.createElement("label");
                // label1.textContent = "Unlock";
                // const input1 = document.createElement("input");
                // input1.type = "radio";
                // input1.name = "user1Locked";
                // input1.value = "unlock";
                // input1.checked = false;
                // profile.appendChild(label1);
                // profile.appendChild(input1);
                // profile.appendChild(document.createElement("hr"));
                // const labelName = document.createElement("label");
                // labelName.textContent = "Username";
                // profile.appendChild(labelName);

                const all = document.createElement("div");
                all.className = "profile";
                all.innerHTML = `<img src="./iconProfile2.png" class="userIcon">
                                <label>Lock</label>
                                <input type="radio" name="userLocked" value="lock">
                                <label>Unlock</label>
                                <input type="radio" name="userLocked" value="unlock"><br>
                                <hr>
                                <label>Username</label>
                                <input type="text" name="userUsername" value=${data[dude].username}>
                                <div id="user1HiddenFields">
                                <hr>
                                <label>Email:</label>
                                <input type="email" name="userEmail" value=${data[dude].email}>
                                <label>Age:</label>
                                <input type="email" name="userAge" value=${data[dude].age}>
                                </div>`;

                const button = document.createElement("button");
                button.addEventListener("click", showOther);
                button.textContent = "Show More";
                all.appendChild(button);
                container.appendChild(all);
            }
        });

    function showOther(event) {
        const parent = event.target.parentNode;
        const [button] = parent.getElementsByTagName("button");
        const [, unlock] = parent.querySelectorAll("input[type='radio']");
        const [thingh] = parent.getElementsByTagName("div");
        if (button.textContent === "Show More" && unlock.checked === true) {
            thingh.style.display = "block";
            button.textContent = "Hide it";
        } else if (button.textContent === "Hide it" && unlock.checked === true) {
            thingh.style.display = "none";
            button.textContent = "Show More";
        }

    }


}
const creator = {
    img: (src, className) => {
        const created = document.createElement("img");
        created.src = src;
        created.className = className;
        return created;
    },
    label: (textContent) => {
        const created = document.createElement("label");
        created.textContent = textContent;
        return created;
    },
    input: (type, name, value, checked = "", readOnly = "", disabled = "") => {
        const created = document.createElement("input");
        created.type = type;
        created.name = name;
        created.value = value;
        created.checked = checked;
        created.readOnly = readOnly;
        created.disabled = disabled;
        return created;
    }
};

async function asyncSolution() {
    const container = document.getElementById("container");
    try {
        let data = await fetch("http://localhost:3030/jsonstore/advanced/profiles");
        data = await data.json();

        for (const dude in data) {

            const profile = document.createElement("div");
            profile.className = "profile";
            profile.appendChild(creator["img"]("./iconProfile2.png", "userIcon"));
            profile.appendChild(creator["label"]("Lock"));
            profile.appendChild(creator["input"]("radio", "user1Locked", "lock", true));
            profile.appendChild(creator["label"]("Unlock"));
            profile.appendChild(creator["input"]("radio", "user1Locked", "lock", false));
            profile.appendChild(document.createElement("hr"));
            profile.appendChild(creator["label"]("Username"));
            profile.appendChild(creator["input"]("text", "user1Username", data[dude].username, "", true, true));

            const hidden = document.createElement("div");
            hidden.className = "user1HiddenFields";
            hidden.appendChild(document.createElement("hr"));
            hidden.appendChild(creator["label"]("Email:"));
            hidden.appendChild(creator["input"]("email", "user1Email", data[dude].email, "", true, true));
            hidden.appendChild(creator["label"]("Age:"));
            hidden.appendChild(creator["input"]("text", "user1Age", data[dude].age, "", true, true));
            hidden.style.display = "none";
            profile.appendChild(hidden);

            const button = document.createElement("button");
            button.addEventListener("click", showOther);
            button.textContent = "Show More";
            profile.appendChild(button);

            container.appendChild(profile);
        }

    } catch (err) {
        console.log(err);
    }
    function showOther(event) {

        const parent = event.target.parentNode;
        const [button] = parent.getElementsByTagName("button");
        const [, unlock] = parent.querySelectorAll("input[type='radio']");
        const [hiddenFieldsDiv] = parent.getElementsByTagName("div");

        if (button.textContent === "Show More" && unlock.checked === true) {
            hiddenFieldsDiv.style.display = "block";
            button.textContent = "Hide it";
        } else if (button.textContent === "Hide it" && unlock.checked === true) {
            hiddenFieldsDiv.style.display = "none";
            button.textContent = "Show More";
        }
    }
}