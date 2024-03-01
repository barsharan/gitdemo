const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs'); // Import fs module for file operations
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

let products = []; // Initialize products array

// Load products data from file when server starts
fs.readFile(path.join(__dirname, 'data', 'products.json'), 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading products file:', err);
  } else {
    products = JSON.parse(data); // Parse JSON data
  }
});

// Route to get products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Route to add a product
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);
  
  // Write updated products data to file
  fs.writeFile(path.join(__dirname, 'data', 'products.json'), JSON.stringify(products), (err) => {
    if (err) {
      console.error('Error writing products file:', err);
    } else {
      console.log('Products data saved successfully.');
    }
  });

  res.json(newProduct);
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

app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'success.html'));
});

// Use product routes
app.use('/api', productRoutes);

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
