const express = require('express');
const router = express.Router();

const Authenticate = require('../middlewares/Authenticate');

router.get('/protected-route', Authenticate, (req, res) => {
  // This route is protected, only accessible to authenticated users
  res.send('Authenticated!');
});

module.exports = router;
