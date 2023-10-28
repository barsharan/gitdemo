document.addEventListener("DOMContentLoaded", function () {
    const myForm = document.getElementById("myForm");
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const userDataElement = document.getElementById("userData");

    let existingUserData = JSON.parse(localStorage.getItem("userData")) || [];

    if (!Array.isArray(existingUserData)) {
        existingUserData = [];
    }

    function displayUserData() {
        userDataElement.innerHTML = "";
        existingUserData.forEach((user, index) => {
            const userHtml = `
                <div>
                    <p>User ${index + 1}: Name - ${user.name}, Email - ${user.email}</p>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            userDataElement.innerHTML += userHtml;
        });
    }

    displayUserData();

    userDataElement.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn")) {
            const index = e.target.getAttribute("data-index");
            if (index !== null) {
                existingUserData.splice(index, 1);
                localStorage.setItem("userData", JSON.stringify(existingUserData));
                displayUserData();
                console.log("User deleted.");
            }
        } else if (e.target.classList.contains("edit-btn")) {
            const index = e.target.getAttribute("data-index");
            if (index !== null) {
                const userToEdit = existingUserData[index];
                nameInput.value = userToEdit.name;
                emailInput.value = userToEdit.email;
                existingUserData.splice(index, 1);
                localStorage.setItem("userData", JSON.stringify(existingUserData));
                displayUserData();
                console.log("User data ready for editing.");
            }
        }
    });

    myForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = nameInput.value;
        const email = emailInput.value;

        if (name && email) {
            const user = { name, email };
            existingUserData.push(user);
            localStorage.setItem("userData", JSON.stringify(existingUserData));
            nameInput.value = "";
            emailInput.value = "";
            displayUserData();
            console.log("User added.");
        }
    });
});