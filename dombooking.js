// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function() {
    const myForm = document.getElementById("myForm");
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const userDetails = document.getElementById("userDetails");
    const userList = document.getElementById("userList");
  
    myForm.addEventListener("submit", function(e) {
      e.preventDefault();
  
      const name = nameInput.value;
      const email = emailInput.value;
  
      if (name && email) {
        // Create a new list item
        const listItem = document.createElement("li");
        listItem.textContent = `Name: ${name}, Email: ${email}`;
        userList.appendChild(listItem);
  
        // Clear the input fields
        nameInput.value = "";
        emailInput.value = "";
  
        // Display the user details section
        userDetails.style.display = "block";
      }
    });
  });
  