// Import required modules
const express = require('express');

// Create an Express application
const app = express();
const port = 3000; // You can change the port number as needed

// Define routes and corresponding responses
app.get('/home', (req, res) => {
  res.send('Welcome home');
});

app.get('/about', (req, res) => {
  res.send('Welcome to About Us page');
});

app.get('/node', (req, res) => {
  res.send('Welcome to my Node Js project');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://127.0.0.1:${port}`);
});
