const mongoose = require('mongoose');

var adminSchema = new Schema ({
    id: {type: String, required: true, unique = true},
    username: {type: String, required: true},
    password: {type: Number, required: true},
    email :{type: String, required: true}
});