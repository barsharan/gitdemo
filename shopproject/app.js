const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Load products data from file
let products = []; // Initialize products array

const productsFilePath = path.join(__dirname,  'products.json');

// Check if products file exists
if (fs.existsSync(productsFilePath)) {
  // Read products data from file
  try {
    const productsData = fs.readFileSync(productsFilePath, 'utf8');
    products = JSON.parse(productsData);
  } catch (error) {
    console.error('Error reading products file:', error);
  }
} else {
  // Create an empty products.json file if it does not exist
  fs.writeFileSync(productsFilePath, '[]', 'utf8', (err) => {
    if (err) {
      console.error('Error creating products file:', err);
    }
  });
}

// Route to get products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/contactus', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contactus.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'products.html'));
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
