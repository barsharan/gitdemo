// messages.js

document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messageList = document.getElementById('message-list');

    // Function to add a new message to the message board
    const addMessage = (message) => {
        const listItem = document.createElement('li');
        listItem.textContent = message;
        messageList.insertBefore(listItem, messageList.firstChild);
    };

    // Event listener for the message form submission
    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const message = messageInput.value.trim();
        if (message) {
            // Send an AJAX request to add the message
            fetch('/add-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Add the new message to the message board
                addMessage(message);
                // Clear the input field
                messageInput.value = '';
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });
});
