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

    // Function to display user data with delete and edit icons
    function displayUserData() {
        userDataElement.innerHTML = "";
        existingUserData.forEach((user, index) => {
            const userHtml = `
                <div>
                    <p>User ${index + 1}: Name - ${user.name}, Email - ${user.email}</p>
                    <span class="delete-icon" onclick="deleteUser('${user._id}')">&#10006;</span>
                    <span class="edit-icon" onclick="editUser('${user._id}', '${user.name}', '${user.email}')">&#9998;</span>
                </div>`;
            userDataElement.innerHTML += userHtml;
        });
    }

    // Function to fetch user data from crudcrud.com
    function fetchUserData() {
        axios.get('https://crudcrud.com/api/59fd66bbab264efbbbcd1508a0684487/dashboard')
            .then(response => {
                const retrievedData = response.data || [];
                console.log('Retrieved User Data:', retrievedData);

                existingUserData = retrievedData;
                localStorage.setItem("userData", JSON.stringify(existingUserData));
                displayUserData();
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }

    // Display existing user data when the page loads
    displayUserData();

    // Fetch user data from crudcrud.com when the page loads
    fetchUserData();

    myForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = nameInput.value;
        const email = emailInput.value;

        if (name && email) {
            // Check if there is a user being edited
            const editedUserId = myForm.getAttribute("data-edit-id");

            if (editedUserId) {
                // Update the existing user data
                const editedUserIndex = existingUserData.findIndex(user => user._id === editedUserId);
                if (editedUserIndex !== -1) {
                    existingUserData[editedUserIndex].name = name;
                    existingUserData[editedUserIndex].email = email;
                }

                // Clear the editing state
                myForm.removeAttribute("data-edit-id");
            } else {
                // Create a new user object
                const newUser = { _id: Date.now().toString(), name, email };

                // Add the new user to the existing data
                existingUserData.push(newUser);
            }

            // Update the local storage with the modified user data
            localStorage.setItem("userData", JSON.stringify(existingUserData));

            // Clear the input fields
            nameInput.value = "";
            emailInput.value = "";

            // Display the updated user data
            displayUserData();
        }
    });

    // Function to edit user by _id
    window.editUser = function (userId, userName, userEmail) {
        // Set the form in edit mode
        myForm.setAttribute("data-edit-id", userId);

        // Populate the form fields with existing data
        nameInput.value = userName;
        emailInput.value = userEmail;
    };

    // Function to delete user by _id
    window.deleteUser = function (userId) {
        // Make a DELETE request to crudcrud.com using Axios
        axios.delete(`https://crudcrud.com/api/59fd66bbab264efbbbcd1508a0684487/dashboard/${userId}`)
            .then(response => {
                console.log('DELETE request successful:', response.data);

                // Remove the deleted user from the local data
                existingUserData = existingUserData.filter(user => user._id !== userId);

                // Update the local storage with the modified user data
                localStorage.setItem("userData", JSON.stringify(existingUserData));

                // Display the updated user data
                displayUserData();
            })
            .catch(error => {
                console.error('Error making DELETE request:', error);
            });
    };
});
