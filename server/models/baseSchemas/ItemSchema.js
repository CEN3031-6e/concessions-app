const mongoose = require('mongoose');

var itemSchema = new Schema ({
    id: {type: String, required: true, unique = true},
    name: {type: String, required: true},
    price: {type: Number, required: true}
});