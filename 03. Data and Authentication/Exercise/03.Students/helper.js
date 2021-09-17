export function getAllInputs() {
    const [firstName] = document.getElementsByName("firstName");
    const [lastName] = document.getElementsByName("lastName");
    const [facultyNumber] = document.getElementsByName("facultyNumber");
    const [grade] = document.getElementsByName("grade");
    const allInputs = [firstName.value, lastName.value, facultyNumber.value, grade.value];
    if (validateInputs(allInputs) === false) {
        return false;
    } else {
        return allInputs;
    }
}

function validateInputs(allInputs) {
    for (let index = 0; index < allInputs.length; index++) {
        if (!allInputs[index] || allInputs[index] === "") {
            return false;
        }
        if (!Number(allInputs[2])) {
            return false;
        }
        if (isNaN(allInputs[3])) {
            return false;
        }
    }
    return true;
}

export function clearAllInputs() {
    document.getElementsByName("firstName").value = "";
    document.getElementsByName("lastName").value = "";
    document.getElementsByName("facultyNumber").value = "";
    document.getElementsByName("grade").value = "";
}

export function appendNewStudentToList(firstName, lastName, facultyNumber, grade) {
    const [firstnameLI, lastNameLI, facutlyNumberLI, gradeLI] = document.getElementsByTagName("th");
    creator("li", firstName, firstnameLI);
    creator("li", lastName, lastNameLI);
    creator("li", facultyNumber, facutlyNumberLI);
    creator("li", grade, gradeLI);
}

function creator(type, textContent, appendTo) {
    const created = document.createElement(type);
    created.textContent = textContent;
    appendTo.appendChild(created);
}