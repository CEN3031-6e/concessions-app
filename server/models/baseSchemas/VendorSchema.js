const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const vendorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now()
  },
  venueID: {
      type: String,
      required: true
  },
  linkedID: {
      type: String,
      required: true
  }
});

vendorSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
vendorSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("vendor_profile", vendorSchema);
