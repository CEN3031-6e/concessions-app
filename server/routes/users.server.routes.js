const express = require('express')
const passport = require('passport')

const router = express.Router()
const User = require('../models/users.server.model');

//Verify - this is for the frontend
router.get("/verify", (req, res) => {
    if (req.isAuthenticated()) {
      const { name, email, password, linkedID, venueID } = req.user;
      const loggedIn = true;
      let clientUser = (linkedID && venueID) ? {
        name,
        email,
        password,
        linkedID,
        venueID,
        loggedIn
      } : {
        name,
        email,
        password,
        loggedIn
      }
      clientUser.loggedIn = true;
      return res.send({
        success: true,
        message: "Valid session",
        user: clientUser
      });
    } else {
      const emptyUser = {
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
    if (!name || !email || !password || !password2) errors.push({ msg: "Please fill in all fields" });
    if (password !== password2) errors.push({ msg: "Passwords do not match" });
    if (password.length < 6) errors.push({ msg: "Password should be at least 6 characters" });
  
    if (errors.length > 0) return res.send({
      success: false,
      message: errors
    });
  
    //Validation passed
    User.findOne({ email }).then(user => {
      if (user) return res.send({
        success: false,
        messsage: { msg: "Email is already registered" }
      });
      
      const newUser = new User({
        name,
        email,
        password
      });
  
      newUser.password = newUser.generateHash(password);
      newUser.save((error, _) => {
        if (error) return res.send({
          success: false,
          message: "Server error: registering new user to database"
        });
        else return res.send({
          success: true,
          message: "Succcessful registration!"
        });
      });
    });
  });

  router.post("/login", passport.authenticate("user-login"), (req, res) => {
    req.session.userId = req.user._id;
    res.locals.user = req.user;
    res.locals.session = req.session;
    return res.send({
      success: true,
      message: "successful login",
      user: req.user
    })
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