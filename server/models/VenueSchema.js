const mongoose = require('mongoose');

const venueSchema = mongoose.Schema({
    name: {type: String, required: true},           //Name of the venue
    address: {type: String, required: true},        //Street address of the venue

    // Array of vendors at the venue

    vendors: [ 
        {
            name: {type: String, required: true},               // Name of the vendor
            venueID: {type: String, required: true},            //ID of the wrapping venue
            goods: [                                            //Array of goods for sale
                {
                    name: {type: String, required: true},       //Name of good for sale
                    vendorID: {type: String, required: true},   //ID of the wrapping vendor
                    price: {type: Number, required: true},      //Price of good for sale
                    quantity: {type: Number, required: true}    //Quantity of good available
                }
            ],
            orders: [
                {
                    userID: {type: String, required: true},         // Unique ID for a user's order
                    userName: {type: String, required: true},       // User account username
                    userEmail: {type: String, required: true},      // User account email

                    // A user's cart that contains the items they want to purchase 

                    cart: [
                        {
                            name: {type: String, required: true},       // Item Name   
                            price: {type: Number, required: true},      // Item Price
                            quantity: {type: Number, required: true}    // Item Quantity
                        }
                    ],
                    subtotal: {type: Number, required: true},           // Subtotal price of all items to be purchased
                    completed: {type: Boolean, required: true}          // False until order is completed by vendor
                }
            ]
        }
    ],
});

module.exports = mongoose.model("venue", venueSchema);