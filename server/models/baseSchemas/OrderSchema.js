const mongoose = require('mongoose');

var orderSchema = new Schema ({
    id: {type: String, required: true, unique = true},
    userID: {type: String, required: true},         // Links to user ID
    paidCart: [ {type: String}, {type: String} ]    // Array of item IDs & User IDs
});