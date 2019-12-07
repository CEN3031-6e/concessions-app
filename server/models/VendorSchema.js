const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const vendorSchema = mongoose.Schema({
  name: {type: String, required: true},       // Name of vendor
  email: {type: String, required: true},      // Vendor Account Email (Username)
  password: {type: String, required: true},   // Vendor Account Password
  Date: {type: Date, default: Date.now()},    
  venueID: {type: String, required: true},    // Unique of venue that vendor works at
  linkedID: {type: String, required: true}    // Uniue Vendor ID --> Linked to each good a vendor sells
});

// Protects an account's password by encrypting it through Passport API

vendorSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// Checks inputted passwords against the one stored in the database

vendorSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("vendor_profile", vendorSchema);
