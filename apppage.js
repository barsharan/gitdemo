const express = require('express');
const adminRouter = require('./adminRouter');
const shopRouter = require('./shopRouter');

const app = express();

// Use admin routes
app.use('/admin', adminRouter);

// Use shop routes
app.use('/shop', shopRouter);

// 404 handler
app.use((req, res, next) => {
    res.status(404).send('Page Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://127.0.0.1:${PORT}`);
});
