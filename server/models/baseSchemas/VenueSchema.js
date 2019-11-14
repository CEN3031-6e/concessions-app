const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const venueSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    vendors: [
       {type: String}   // Array of strings of vendor ID's 
    ]

});