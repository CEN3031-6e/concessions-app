const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    Date: {type: Date, default: Date.now()},

    // Orders is an array for users see their cart before payment

    orders: [                                           
        {
            linkedID: {type: String, required: true},       // Unique ID
            vendorID: {type: String, required: true},       // ID Vendor 
            vendorName: {type: String, required: true},     // Name of vendor 

            // An array of goods that a user is looking to purchase 

            cart: [
                {
                    name: {type: String, required: true},       // Item Name
                    price: {type: Number, required: true},      // Item Price
                    quantity: {type: Number, required: true}    // Amount of item to be purchased
                }
            ],
            subtotal: {type: Number, required: true},           // Subtotal price of all items to be purchased
            completed: {type: Boolean, required: true}          // Boolean value that is only changed to true when the vendor completes the order
        }
    ]
});

// Protects an account's password by encrypting it through Passport API

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// Checks inputted passwords against the one stored in the database

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user_profile", userSchema);