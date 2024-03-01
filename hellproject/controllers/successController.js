const path = require('path');

exports.getSuccessPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'success.html'));
};
