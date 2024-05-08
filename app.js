// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Import the 'path' module

const sequelize = require('./util/database');
const expenseRoutes = require('./routes/expense');

// Create an instance of Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

// Routes setup
app.use('/api', expenseRoutes); // Use expense routes

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Redirect requests to the root URL to serve the 'index.html' file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Database synchronization
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(err => {
    console.error('Database synchronization error:', err);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
