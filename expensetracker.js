document.addEventListener("DOMContentLoaded", function () {
    const myForm = document.getElementById("myForm");
    const nameInput = document.getElementById("nameInput");
    const expenseInput = document.getElementById("expenseInput");
    const expensecatInput = document.getElementById("expensecatInput");
    const descInput = document.getElementById("descInput");
    const userDataElement = document.getElementById("userData");

    let existingUserData = JSON.parse(localStorage.getItem("userData")) || [];

    if (!Array.isArray(existingUserData)) {
        existingUserData = [];
    }

    function displayUserData() {
        userDataElement.innerHTML = "";
        existingUserData.forEach((user, index) => {
            const userHtml = `
                
            
  <table>
  <tr>
    <td>${index + 1}</td>
    <td>${user.name}</td>
    <td>${user.expense}</td>
    <td>${user.expensecat}</td>
    <td>${user.desc}</td>
    <td><button class="edit-btn" data-index="${index}">edit</button>
    <button class="delete-btn" data-index="${index}">Delete</button></td>
  </tr>
  </table>
                   
               
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
                expenseInput.value = userToEdit.expense;
                expensecatInput.value = userToEdit.expensecat;
                descInput.value = userToEdit.desc;
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
        const expense = expenseInput.value;
        const expensecat = expensecatInput.value;
        const desc = descInput.value;

        if (name && expense && expensecat && desc) {
            const user = { name, expense, expensecat, desc};
            existingUserData.push(user);
            localStorage.setItem("userData", JSON.stringify(existingUserData));
            nameInput.value = "";
            expenseInput.value = "";
            expensecatInput.value = "";
            descInput.value = "";
            displayUserData();
            console.log("User added.");
        }
    });
});