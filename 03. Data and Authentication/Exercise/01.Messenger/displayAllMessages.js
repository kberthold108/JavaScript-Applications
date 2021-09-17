async function displayAllMessages() {
    const textarea = document.getElementById("messages");

    try {
        const response  = await fetch("http://localhost:3030/jsonstore/messenger/messenger");
        if(!response.ok) {
            throw Error("Error");
        }
        const data = await response.json();

        for(const message in data) {
            textarea.textContent += `${data[message].author}: ${data[message].content}\n`;
        }
    } catch(err) {
        console.log(err);
    }
}

export { displayAllMessages };