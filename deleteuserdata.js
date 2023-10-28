document.addEventListener("DOMContentLoaded", function () {
    const myForm = document.getElementById("myForm");
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const userDataElement = document.getElementById("userData");

    // Initialize existing user data from local storage
    let existingUserData = JSON.parse(localStorage.getItem("userData")) || [];

    // Ensure existingUserData is always an array
    if (!Array.isArray(existingUserData)) {
        existingUserData = [];
    }

    // Function to display user data and log it in the console
    function displayUserData() {
        userDataElement.innerHTML = "";
        existingUserData.forEach((user, index) => {
            const userHtml = `
                <div>
                    <p>User ${index + 1}: Name - ${user.name}, Email - ${user.email}</p>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            userDataElement.innerHTML += userHtml;
        });

        // Log user data in the console
        console.log("User Data:", existingUserData);
    }

    // Display existing user data when the page loads
    displayUserData();

    // Add a click event listener to the userDataElement to handle delete button clicks
    userDataElement.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn")) {
            const index = e.target.getAttribute("data-index");
            if (index !== null) {
                // Remove the user from existingUserData
                existingUserData.splice(index, 1);
                // Update local storage
                localStorage.setItem("userData", JSON.stringify(existingUserData));
                // Re-display the user data
                displayUserData();
            }
        }
    });

    myForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = nameInput.value;
        const email = emailInput.value;

        if (name && email) {
            // Create a user object
            const user = { name, email };

            // Add the user to the existing data
            existingUserData.push(user);

            // Update the local storage with the new user data
            localStorage.setItem("userData", JSON.stringify(existingUserData));

            // Clear the input fields
            nameInput.value = "";
            emailInput.value = "";

            // Display the updated user data
            displayUserData();
        }
    });
});
