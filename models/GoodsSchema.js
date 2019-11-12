var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var goodsSchema = new Schema ({
    id: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    vendorID :{/* link this to a vendor */}
});