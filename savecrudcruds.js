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

    // Function to fetch user data from crudcrud.com
    function fetchUserData() {
        axios.get('https://crudcrud.com/api/59fd66bbab264efbbbcd1508a0684487/dashboard')
            .then(response => {
                const retrievedData = response.data || [];
                console.log('Retrieved User Data:', retrievedData);

                // Do something with the retrieved data, e.g., update UI, perform additional processing

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

            // Make a POST request to crudcrud.com using Axios
            axios.post('https://crudcrud.com/api/59fd66bbab264efbbbcd1508a0684487/dashboard', user)
                .then(response => {
                    console.log('POST request successful:', response.data);
                })
                .catch(error => {
                    console.error('Error making POST request:', error);
                });
        }
    });
});
