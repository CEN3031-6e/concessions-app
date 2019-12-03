const express = require('express')
const passport = require('passport')

const router = express.Router()
const User = require('../models/UserSchema');
const Venue = require('../models/VenueSchema');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AeXyaba9NU8B2YXTuT4m5DKI4TzWy4370mjw9x_xb7U3JKyK6Z6Eogvv5tcXBO2fYrJIT8VhrjiZ5hyp',
  'client_secret': 'ENPUczICmc6qb48jv0LQA6i-0lEvpI_ORJieAmM2p4UVL4uyWM7KTUAN1AwU8AyCI6YqgIp1xumUT56Q'
});


let currentSubtotal = '';

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

 //register payment
 router.post('/pay', (req, res) => {


  let {subtotal} = req.body;

  currentSubtotal = subtotal.toString();

  var defPayment = {
   "intent": "sale",
 "payer": {
     "payment_method": "paypal"
 },
 "redirect_urls": {
     "return_url": "http://localhost:3000/success",
     "cancel_url": "http://localhost:3000/failure"
 },
 "transactions": [{
     "item_list": {
         "items": [{
             "name": "Vendr order",
             "sku": "001",
             "price": currentSubtotal,
             "currency": "USD",
             "quantity": 1
         }]
     },
     "amount": {
         "currency": "USD",
         "total": currentSubtotal
     },
     "description": "Order at Vendr"
 }]
};

 paypal.payment.create(defPayment, function(error, payment){

   if(error){
     console.error(JSON.stringify(error));
   } else {

     for(let i = 0; i < payment.links.length; i++){
       if (payment.links[i].rel === 'approval_url') {

         //res.redirect(payment.links[i].href);
         res.send({paypal_url: payment.links[i].href});
       }
     }

   }
});

})


router.post('/executepayment', (req, res) => {

console.log()
console.log()
console.log()
 console.log('executepayment')

   console.log(req.body);

   const paymentId = req.body.paymentId;
   const payerId = req.body.PayerID;


   console.log('paymentId')
console.log(paymentId)
console.log('payerId')
console.log(payerId)

 const execute_payment = {
 payer_id: payerId,
 transactions: [{
     amount: {
         currency: "USD",
         total: currentSubtotal
     }
 }]
};

 console.log('subtotal')
 console.log(currentSubtotal);



   paypal.payment.execute(paymentId, execute_payment, function(error, payment){
       if(error){
         console.error(JSON.stringify(error));
       } else {
         if (payment.state == 'approved'){
           console.log('payment completed successfully');
           res.send({success: true});
         } else {
           console.log('payment not successful');
           res.send({success: false});
         }
       }
   });

})


module.exports = router;
