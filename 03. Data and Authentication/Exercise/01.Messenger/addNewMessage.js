async function addNewMessage() {
    const [authorName] = document.getElementsByName("author");
    const [messageContent] = document.getElementsByName("content");
    const message = {
        author: authorName.value,
        content: messageContent.value
    };
    console.log(message)

    try {
        const response = await fetch("http://localhost:3030/jsonstore/messenger/messenger", {
            method: "POST",
            body: JSON.stringify(message)
        });

        if (!response.ok) {
            throw Error("Error");
        }


    } catch (err) {
        console.log(err);
    }
}

export { addNewMessage };