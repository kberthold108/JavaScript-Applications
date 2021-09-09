function sum(a, b, text) {
    const random = Math.round(Math.random() * 10);
    return new Promise(function (resolve, reject) {
        if (random === 3) {
            reject("Error");
        }

        setTimeout(() => {
            console.log(text);
            resolve(a + b);
        }, random * 50);
    });
}

async function serialFlow() {
    try {
        const result = await Promise.all([sum(1, 2, "First result"), sum(1, 2, "Second result"), sum(1, 2, "Third result")]);
    } catch (err) {
        console.log(err);
    }

    // const result1 = await sum(1, 2, "First result");
    // const result2 = await sum(1, 2, "Second result");
    // const result3 = await sum(1, 2, "Third result");
    // console.log(result1, result2, result3);
}