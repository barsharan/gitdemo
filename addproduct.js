const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Define the /add-product route
app.get('/add-product', (req, res) => {
    res.send(`
        <form action="/add-product" method="POST">
            <input type="text" name="productName" placeholder="Product Name">
            <input type="text" name="productSize" placeholder="Product Size">
            <button type="submit">Add Product</button>
        </form>
    `);
});

// Handle form submission
app.post('/add-product', (req, res) => {
    const productName = req.body.productName;
    const productSize = req.body.productSize;
    console.log('Product Name:', productName);
    console.log('Product Size:', productSize);
    res.send('Product added successfully.');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://127.0.0.1:${PORT}`);
});
