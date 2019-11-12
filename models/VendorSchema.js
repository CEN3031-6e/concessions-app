var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var vendorSchema = new Schema ({
    id: {type: String, required: true},
    name: {type: String, required: true},
    good: {/* array of good a vendor sells */}
});
