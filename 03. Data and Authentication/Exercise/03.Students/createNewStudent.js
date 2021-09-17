import { loadAllStudent } from "./loadAllStudent.js";
import { getAllInputs, clearAllInputs } from "./helper.js";
export async function createNewStudent() {
    try {
        const checkedInput = getAllInputs();
        if (checkedInput === false) {
            throw Error("Something was wrong with your Input!");
        }
        const [firstName, lastName, facultyNumber, grade] = checkedInput;

        const response = await fetch("http://localhost:3030/jsonstore/collections/students", {
            method: "POST",
            body: JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "facultyNumber": facultyNumber,
                "grade": grade
            })
        });
        if (!response.ok) {
            throw Error("Something went wrong D: while posting ur data");
        }
        clearAllInputs();
        loadAllStudent();
    } catch (err) {
        console.log(err);
    }

}

