const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'data', 'products.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading products file:', err);
            res.status(500).json({ error: 'Failed to read products' });
        } else {
            const products = JSON.parse(data);
            res.json(products);
        }
    });
});

module.exports = router;
