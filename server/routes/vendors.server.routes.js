const express = require('express')
const passport = require('passport')

const router = express.Router()
const Venue = require('../models/baseSchemas/VenueSchema');

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
        else {
            return res.send({
                success: true,
                goods: venue.vendors.find((vendor) => vendor._id == linkedID).goods
            })
        }
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
                message: "Failed to post. Try logging in again"
            });
            else return res.send({
                success: true,
                message: "Successful addition!"
            });
        })
    }

})

module.exports = router;