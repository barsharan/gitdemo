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

// Model functions
const getAllProducts = (callback) => {
    readDataFromFile(callback);
};

const createProduct = (newProduct, callback) => {
    readDataFromFile((err, data) => {
        if (err) {
            callback(err);
        } else {
            data.push(newProduct);
            saveDataToFile(data, callback);
        }
    });
};

// Export model functions
module.exports = {
    getAllProducts,
    createProduct
};
