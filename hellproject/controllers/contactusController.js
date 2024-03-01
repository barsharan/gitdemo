const path = require('path');

exports.getContactUsPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'contactus.html'));
};

exports.postContactUsForm = (req, res) => {
    // Process form data here
    const { name, email } = req.body;
    console.log(`Name: ${name}, Email: ${email}`);
    res.redirect('/success');
};
