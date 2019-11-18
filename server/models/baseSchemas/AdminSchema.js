const mongoose = require('mongoose');

var adminSchema = new Schema ({
    id: {type: String, required: true, unique = true},
    username: {type: String, required: true},
    password: {type: Number, required: true},
    email :{type: String, required: true}
});

adminSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
adminSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("admin_profile", adminSchema);