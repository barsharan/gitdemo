const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/send_message', (req, res) => {
    const { username, message } = req.body;
    const data = `${username}: ${message}\n`;
    fs.appendFile(path.join(__dirname, 'messages.txt'), data, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).json({ error: 'Failed to store message' });
        } else {
            res.json({ success: true });
        }
    });
});

app.get('/get_messages', (req, res) => {
    fs.readFile(path.join(__dirname, 'messages.txt'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Failed to read messages' });
        } else {
            const messages = {};
            data.split('\n').forEach(line => {
                const [username, message] = line.split(': ');
                if (username && message) {
                    messages[username] = message;
                }
            });
            res.json(messages);
        }
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
