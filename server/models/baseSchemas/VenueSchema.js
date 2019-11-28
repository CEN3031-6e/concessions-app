const mongoose = require('mongoose');

const venueSchema = mongoose.Schema({
    name: {type: String, required: true}, //Name of the venue
    address: {type: String, required: true}, //Street address of the venue
    vendors: [ //Array of vendors at the venue
        {
            name: {type: String, required: true}, // Name of the vendor
            venueID: {type: String, required: true}, //ID of the wrapping venue
            goods: [ //Array of goods for sale
                {
                    name: {type: String, required: true}, //Name of good for sale
                    vendorID: {type: String, required: true}, //ID of the wrapping vendor
                    price: {type: Number, required: true}, //Price of good for sale
                    quantity: {type: Number, required: true} //Quantity of good available
                }
            ],
            orders: [
                {
                    userID: {type: String, required: true},
                    userName: {type: String, required: true},
                    userEmail: {type: String, required: true},
                    cart: [
                        {
                            name: {type: String, required: true},
                            price: {type: Number, required: true},
                            quantity: {type: Number, required: true}
                        }
                    ],
                    subtotal: {type: Number, required: true},
                    completed: {type: Boolean, required: true}
                }
            ]
        }
    ],
});

module.exports = mongoose.model("venue", venueSchema);