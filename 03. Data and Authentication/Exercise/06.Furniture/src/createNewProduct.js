export async function createNewProduct(form) {
    const input = Object.fromEntries([...new FormData(form).entries()]);
    console.log("awd")
    try {
        const response = await fetch("http://localhost:3030/data/furniture", input);
        
    } catch(err) {
        alert("err lol");
    }

}
