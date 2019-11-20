const express = require('express');
const passport = require("passport"); //ADD PASSPORT
const router = express.Router();

//User Model
const User = require('../models/users.server.model');

//Verify - this is for the frontend
router.get("/verify", (req, res) => {
    //console.log("This is res.locals.session from /verify" + JSON.stringify(res.locals.session));
    //console.log("This is req.session from /verify" + JSON.stringify(req.session));
    //console.log("This is res.locals.user from /verify" + JSON.stringify(res.locals.user));
    //console.log("This is req.user from /verify" + JSON.stringify(req.user));
    if (req.isAuthenticated()) {
      const clientUser = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        loggedIn: true
      };
      return res.send({
        success: true,
        message: "Valid session",
        user: clientUser
      });
    } else {
      emptyUser = {
        username: "",
        email: "",
        loggedIn: false
      };
      return res.send({
        success: false,
        message: "Couldn't find session",
        user: emptyUser
      });
    }
  });

//Register Handle
router.post("/register", (req, res) => {

    let { name, email, password, password2 } = req.body;
    email = email.toLowerCase();
  
    //Do server-side form validation here: password length
    //is the email an actual email etc.
    let errors = [];
  
    //Check required fields
    if (!name || !email || !password || !password2) {
      errors.push({ msg: "Please fill in all fields" });
    }
  
    if (password !== password2) {
      errors.push({ msg: "Passwords do not match" });
    }
  
    if (password.length < 6) {
      errors.push({ msg: "Password should be at least 6 characters" });
    }
  
    if (errors.length > 0) {
      return res.send({
        success: false,
        message: errors
      });
    }
  
    //Validation passed
    User.findOne({ email }).then(user => {
      if (user) {
        console.log("found match");
        //Flash the error
        errors.push({ msg: "Email is already registered" });
        return res.send({
          success: false,
          messsage: errors
        });
      }
      //Create a new database entry if email does not exist
      const newUser = new User({
        name,
        email,
        password
      });
  
      console.log(newUser);
      newUser.password = newUser.generateHash(password);
      newUser.save((error, user) => {
        console.log("This is req.session from /register: " + req.session);
        if (error) {
          return res.send({
            success: false,
            message: "Server error: registering new user to database"
          });
        } else {
          return res.send({
            success: true,
            message: "Succcessful registration!"
          });
        }
      });
    });
  });

  router.post("/login", passport.authenticate("local"), (req, res) => {

    console.log("logging in: " + req + res);
    //console.log("This is req.user from /login: " + JSON.stringify(req.user));
    //console.log("This is req.session from /login: " + JSON.stringify(req.session));
    //console.log("This is req.body from /login: " + req.body);

    req.session.userId = req.user._id;
    res.locals.user = req.user;
    res.locals.session = req.session;
    const clientUser = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      loggedIn: true
    };

    return res.send({
      success: true,
      message: "successful login",
      user: req.user
    });
  })

  router.post("/logout", (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.send({
          success: false,
          message: "Server error: couldn't destroy session (log user out)"
        });
      }
      req.logout();
      res.clearCookie("sid").send({
        success: true,
        message: "Successfully logged out"
      });
    });
  });

module.exports = router;