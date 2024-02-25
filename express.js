const express = require('express');
const app = express();

// First Middleware
app.use((req, res, next) => {
    console.log('First Middleware');
    next();
});

// Second Middleware
app.use((req, res, next) => {
    console.log('Second Middleware');
    next();
});

app.get('/', (req, res) => {
    res.send('<h1>Hello to Node.js</h1>');
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
