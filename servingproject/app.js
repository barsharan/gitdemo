const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'success.html'));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'style.css'));
});


app.get('/contactus', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contactus.html'));
});

app.post('/contactus', (req, res) => {
    const { name, email } = req.body;
    // Process the form data here (e.g., send email, save to database)
    console.log(`Name: ${name}, Email: ${email}`);
    res.redirect('/success');
});

app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});




app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
