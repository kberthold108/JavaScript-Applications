function solution() {

    const container = document.getElementById("container");

    fetch("http://localhost:3030/jsonstore/advanced/profiles")
        .then(response => {
            if (!response.ok) {
                throw Error("Error");
            }

            return response.json();
        })
        .then(data => {


            for (let dude in data) {

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
                                <input type="radio" name="userLocked" value="lock" checked="">
                                <label>Unlock</label>
                                <input type="radio" name="userLocked" value="unlock"><br>
                                <hr>
                                <label>Username</label>
                                <input type="text" name="userUsername" value=${data[dude].username} disabled="" readonly="">
                                <div id="user1HiddenFields">
                                <hr>
                                <label>Email:</label>
                                <input type="email" name="userEmail" value=${data[dude].email} disabled="" readonly="">
                                <label>Age:</label>
                                <input type="email" name="userAge" value=${data[dude].age} disabled="" readonly="">
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
            const [lock, unlock] = parent.querySelectorAll("input[type='radio']");
            const [thingh] = parent.getElementsByTagName("div")
            if(button.textContent === "Show More" && unlock.checked === true) {
                thingh.style.display = "block";
                button.textContent = "Hide it";
            } else if (button.textContent === "Hide it" && unlock.checked === true) {
                thingh.style.display = "none";
                button.textContent = "Show More";
            }
            
        }


}