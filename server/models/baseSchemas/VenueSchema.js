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
                    price: {type: String, required: true}, //Price of good for sale
                    quantity: {type: String, required: true} //Quantity of good available
                }
            ],
            orders: [ //Array of orders in the queue
                {
                    userID: {type: String, required: true}, //ID of user who placed order
                    cart: [ //Array of goods in the order
                        {
                            name: {type: String, required: true}, //Name of good in order
                            price: {type: String, required: true}, //Price of good in order
                            quantity: {type: String, required: true} //Quantity of good in order
                        }
                    ]
                }
            ]
        }
    ],
});

module.exports = mongoose.model("venue", venueSchema);