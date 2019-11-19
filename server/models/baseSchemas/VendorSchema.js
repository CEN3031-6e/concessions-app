const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const vendorSchema = new Schema ({
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    username: { type: String, required: true },
    password: { type: Number, required: true },
    email: { type: String, required: true },
    menu: [
        {type: String}
    ],
    orders: [
        {type: String} // Array of string of user ID's
    ]
});

vendorSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
vendorSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("vendor_profile", vendorSchema);
