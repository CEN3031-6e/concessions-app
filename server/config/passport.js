const LocalStrategy = require("passport-local").Strategy;
const bcrypyt = require("bcryptjs");

//const User = require("../models/users.server.model");
const User = require('../models/UserSchema');
const Vendor = require("../models/VendorSchema");

function SessionConstructor(userId, userGroup, details) {
  this.userId = userId;
  this.userGroup = userGroup;
  this.details = details;
}

module.exports = function(passport) {
  //User Check
  passport.use('user-login',
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, {message: "That email is not registered"});
          }

          //Match password
          bcrypyt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  //Vendor Check
  passport.use('vendor-login',
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      Vendor.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, {message: "That email is not registered"});
          }

          //Match password
          bcrypyt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  //Sessions
  passport.serializeUser(function (userObject, done) {
    let userGroup = "";
    let userPrototype =  Object.getPrototypeOf(userObject);

    if (userPrototype === User.prototype) {
      userGroup = "user";
    } else if (userPrototype === Vendor.prototype) {
      userGroup = "vendor";
    }

    let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
    done(null,sessionConstructor);
  });

  passport.deserializeUser(function (sessionConstructor, done) {

    if (sessionConstructor.userGroup == 'user') {
      User.findOne({
          _id: sessionConstructor.userId
      }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
          done(err, user);
      });
    } else if (sessionConstructor.userGroup == 'vendor') {
      Vendor.findOne({
          _id: sessionConstructor.userId
      }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
          done(err, user);
      });
    }
  })
};