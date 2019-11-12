var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var vendorUserSchema = new Schema ({
    id: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: Number, required: true},
    email: {type: String, required: true},
    orders: {/* Array of orders --> one order is an array of items from the vendor (link to user order id?) */}
});