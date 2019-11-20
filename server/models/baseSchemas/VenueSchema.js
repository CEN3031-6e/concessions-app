const mongoose = require('mongoose');

const venueSchema = mongoose.Schema({
        name: {type: String, required: true},
        address: {type: String, required: true},
        Date: {type: Date, default: Date.now()},
        vendors: [{id: {type: String, required: true}, name: {type: String, required: true}}],
});

module.exports = mongoose.model("venue", venueSchema);