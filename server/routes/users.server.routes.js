const express = require('express')
const passport = require('passport')

const router = express.Router()
const User = require('../models/UserSchema');
const Venue = require('../models/VenueSchema');

//Verify - this is for the frontend
router.get("/verify", (req, res) => {
    if (req.isAuthenticated()) {
      const { name, email, password, orders, linkedID, venueID } = req.user;
      const id = req.user._id;
      const loggedIn = true;
      let clientUser = (linkedID && venueID) ? {
        id,
        name,
        email,
        password,
        linkedID,
        venueID,
        loggedIn
      } : {
        id,
        name,
        email,
        password,
        orders,
        loggedIn
      }
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
        messsage: [{ msg: "Email is already registered" }]
      });
      
      const newUser = new User({
        name,
        email,
        password,
        orders: []
      });
  
      newUser.password = newUser.generateHash(password);
      newUser.save((error, _) => {
        if (error) return res.send({
          success: false,
          message: [{ msg: "Server error: registering new user to database" }]
        });
        else return res.send({
          success: true,
          message: [{ msg: "Succcessful registration!" }]
        });
      });
    });
  });

  //Login handle (done through passport)
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

  //Logout handle
  router.post("/logout", (req, res) => {
    req.session.destroy(err => {
      if (err) return res.send({
        success: false,
        message: "Server error: couldn't destroy session (log user out)"
      });
      req.logout();
      res.clearCookie("sid").send({
        success: true,
        message: "Successfully logged out"
      });
    });
  });


  //Users posting their cart to the database
  router.post("/addOrder", (req, res) => {
    const { user, venueID, vendor, cart, subtotal, completed } = req.body;

    const userID = user.id, userName = user.name, userEmail = user.email;
    const vendorID = vendor.id, vendorName = vendor.name;

    const vendorOrder = {
      userID,
      userName,
      userEmail,
      cart,
      subtotal,
      completed
    };
    Venue.findOneAndUpdate({'_id': venueID, 'vendors._id': vendorID}, {$push: {'vendors.$.orders': vendorOrder}}, {new: true}, function(err, venue) {
      if (err) return res.send({
        success: false,
        message: "Failed to post order to vendor"
      });
      else {
        const vendor = venue.vendors.find(vendor => vendor._id == vendorID);
        const linkedID = vendor.orders ? vendor.orders[vendor.orders.length - 1]._id : "";
        
        const userOrder = {
          linkedID,
          vendorID,
          vendorName,
          cart,
          subtotal,
          completed
        };
        User.findOneAndUpdate({'_id': user.id}, {$push: {'orders': userOrder}}, {new: true}, function(err, newdata) {
          if (err) return res.send({
            success: false,
            message: "Failed to post order to user"
          });
          else return res.send({
            success: true,
            message: "Double success"
          });
        })
      }
    })
  })

  //Retrieving user's orders
  router.get('/orders', (req, res) => {
    User.findOne({'_id': req.query.userID}, function(err, user) {
      if (err) return res.send({
        success: false,
        orders: []
      });
      else return res.send({
        success: true,
        orders: user.orders
      });
    })
  })

module.exports = router;