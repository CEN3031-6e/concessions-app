const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const vendorSchema = new Schema ({
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    username: { type: String, required: true },
    password: { type: Number, required: true },
    email: { type: String, required: true },
    menu: [
        itemID,
        itemName,
        itemPrice
    ],
    orders: [
        /* Array of orders --> one order is an array of items from the vendor (link to user order id?) */ 
        item [itemID, price], 
        total,  // Total price to be paid for order
        userID  // Link to user's ID so as to know which order belongs to which user
    ]
});
