var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var adminSchema = new Schema ({
    id: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: Number, required: true},
    email :{type: String, required: true}
});