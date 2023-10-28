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

    // Function to display user data
    function displayUserData() {
        userDataElement.innerHTML = "";
        existingUserData.forEach((user, index) => {
            const userHtml = `<p>User ${index + 1}: Name - ${user.name}, Email - ${user.email}</p>`;
            userDataElement.innerHTML += userHtml;
        });
    }

    // Display existing user data when the page loads
    displayUserData();

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

            // Log the added user data to the console
            console.log("Added User Data:", user);
        }
    });
});
