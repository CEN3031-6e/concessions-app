const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new Schema ({
    id: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: Number, required: true},
    email: {type: String, required: true},
    Date: {
        type: Date,
        default: Date.now()
    },
    cart: [
        item [itemID, price], // Array of itemID and linked price
        total // Sum of prices 
    ]
    // pastOrders: {/* Array of array of carts? */}
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user_profile", userSchema);