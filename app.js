const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const FILE_PATH = 'messages.txt';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Read the last message from the file
const readLastMessageFromFile = () => {
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        const messages = data.split('\n').filter(Boolean);
        return messages[messages.length - 1]; // Return the last message
    } catch (err) {
        console.error('Error reading messages from file:', err);
        return '';
    }
};

// Display form with the last updated message
app.get('/', (req, res) => {
    const lastMessage = readLastMessageFromFile();
    res.send(`
        <html>
        <head>
            <title>Message Board</title>
        </head>
        <body>
            <h1>Message Board</h1>
            <ul id="message-list">
                <li>${lastMessage}</li>
            </ul>
            <form id="message-form" action="/add-message" method="post">
                <input type="text" name="message" placeholder="Enter your message" required />
                <button type="submit">Add Message</button>
            </form>
            <script src="messages.js"></script>
        </body>
        </html>
    `);
});

// Add a new message to the file
app.post('/add-message', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).send('Message is required');
    }

    try {
        fs.writeFileSync(FILE_PATH, message + '\n'); // Write the new message to the file
        res.redirect('/');
    } catch (err) {
        console.error('Error adding message to file:', err);
        res.status(500).send('Error adding message');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
