const express = require('express');
const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    res.send('Admin Panel');
});

// Define other admin routes here

module.exports = adminRouter;
