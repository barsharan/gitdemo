const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let products = [];

// Load products data from file when server starts
const productsFilePath = path.join(__dirname, 'products.json');
fs.readFile(productsFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading products file:', err);
  } else {
    products = JSON.parse(data);
  }
});

// Route to delete product by ID
app.delete('/delete/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex(product => product.id === productId);
  if (index !== -1) {
    products.splice(index, 1);
    fs.writeFile(productsFilePath, JSON.stringify(products), (err) => {
      if (err) {
        console.error('Error writing products file:', err);
        res.status(500).send('Error deleting product.');
      } else {
        console.log('Product deleted successfully.');
        res.sendStatus(200);
      }
    });
  } else {
    res.status(404).send('Product not found.');
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
  
  fs.writeFile(productsFilePath, JSON.stringify(products), (err) => {
    if (err) {
      console.error('Error writing products file:', err);
    } else {
      console.log('Products data saved successfully.');
    }
  });

  res.json(newProduct);
});

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

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
