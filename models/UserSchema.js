var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema ({
    id: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: Number, required: true},
    email: {type: String, required: true},
    cart: {/* Array of id's and linked goods */},
    pastOrders: {/* Array of array of carts? */}
});