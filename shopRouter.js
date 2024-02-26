const express = require('express');
const shopRouter = express.Router();

shopRouter.get('/', (req, res) => {
    res.send('Shop Page');
});

// Define other shop routes here

module.exports = shopRouter;
