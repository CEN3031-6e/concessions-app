const express = require('express')
const passport = require('passport')

const router = express.Router()
const Venue = require('../models/baseSchemas/VenueSchema');
const User = require('../models/baseSchemas/UserSchema');

router.post("/login", passport.authenticate("vendor-login"), (req, res) => {
    req.session.vendorID = req.user._id;
    res.locals.vendor = req.user;
    res.locals.session = req.session;
    return res.send({
      success: true,
      message: "successful login",
      user: req.user
    })
})

router.get('/goods', (req, res) => {
    const { venueID, linkedID } = req.query;
    Venue.findOne({'_id': venueID}, function(err, venue) {
        if (err) return res.send({
            success: false,
            goods: []
        });
        else return res.send({
            success: true,
            goods: venue.vendors.find((vendor) => vendor._id == linkedID).goods
        });
    })
})

router.get('/orders', (req, res) => {
    const { venueID, linkedID } = req.query;
    Venue.findOne({'_id': venueID}, function(err, venue) {
        if (err) return res.send({
            success: false,
            orders: []
        });
        else return res.send({
            success: true,
            orders: venue.vendors.find((vendor) => vendor._id == linkedID).orders
        });
    })
})

router.post('/addGood', (req, res) => {
    const { name, venueID, linkedID, price, quantity } = req.body;

    if (!name || !price || !quantity) return res.send({
        success: false,
        message: "Please fill in all fields"
    });

    else {
        Venue.findOneAndUpdate({'_id': venueID, 'vendors._id': linkedID}, {$push: {"vendors.$.goods": req.body }}, function(err) {
            if (err) return res.send({
                success: false,
                message: "Post failed. Ensure that 'price' and 'quantity' are numbers."
            });
            else return res.send({
                success: true,
                message: "Successful addition!"
            });
        })
    }
})

router.post("/completeOrder", (req, res) => {
    let {userID, venueID, vendorID, orderID} = req.body;
    Venue.findOneAndUpdate({"_id": venueID, "vendors": {"$elemMatch": {"_id": vendorID,"orders._id": orderID}}}, {"$set": {"vendors.$[outer].orders.$[inner].completed": true }}, {"arrayFilters": [{ "outer._id": vendorID},{ "inner._id": orderID}]}, function(err) {
        if (err) return res.send({
            success: false,
            message: "Error completing order - vendor"
        });
        else {
            User.findOneAndUpdate({"_id": userID, "orders.linkedID": orderID}, {$set: {"orders.$.completed": true}}, {new: true}, function(err) {
                if (err) return res.send({
                    success: false,
                    message: "Error completing order - user"
                });
                else return res.send({
                    success: true,
                    message: "Double success"
                });
            })
        }
    })
    
})

module.exports = router;