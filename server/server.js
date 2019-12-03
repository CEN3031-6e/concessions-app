const express = require('./config/express.js')

const paypal = require('paypal-rest-sdk');

var cors = require('cors');
 
// Use env port or default
const port = process.env.PORT || 5000;

const app = express.init();
app.use(cors());
app.listen(port, () => console.log(`Server now running on port ${port}!`));
