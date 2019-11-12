var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var venueSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    vendors: {/*array of vendors*/}

});