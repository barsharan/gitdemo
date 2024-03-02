const fs = require('fs');
const path = require('path');

const filename = path.join(__dirname, '..', 'data', 'products.json');

// Function to read data from file
const readDataFromFile = (callback) => {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            callback(err, null);
        } else {
            callback(null, JSON.parse(data));
        }
    });
};

// Function to save data to file
const saveDataToFile = (data, callback) => {
    fs.writeFile(filename, JSON.stringify(data), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            callback(err);
        } else {
            callback(null);
        }
    });
};

// Controller functions
const getAllProducts = (req, res) => {
    readDataFromFile((err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve products' });
        } else {
            res.json(data);
        }
    });
};

const createProduct = (req, res) => {
    readDataFromFile((err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to create product' });
        } else {
            const newProduct = req.body;
            data.push(newProduct);
            saveDataToFile(data, (err) => {
                if (err) {
                    res.status(500).json({ error: 'Failed to create product' });
                } else {
                    res.status(201).json({ message: 'Product created successfully' });
                }
            });
        }
    });
};

// Export controller functions
module.exports = {
    getAllProducts,
    createProduct
};
