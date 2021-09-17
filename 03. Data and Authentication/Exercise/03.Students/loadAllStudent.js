import { appendNewStudentToList } from "./helper.js";
export async function loadAllStudent() {
    try {
        const response = await fetch("http://localhost:3030/jsonstore/collections/students");
        if (!response.ok) {
            throw Error("Something went worng D:");
        }
        const data = await response.json();
        
        for (const student in data) {
            const {firstName, lastName, facultyNumber, grade} = data[student];
            appendNewStudentToList(firstName, lastName, facultyNumber, grade);
        }
    }catch(err) {
        console.log(err);
    }
}