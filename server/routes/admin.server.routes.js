const express = require('express');
const router = express.Router();

const Venue = require('../models/baseSchemas/VenueSchema');

router.get("/venues", (req, res) => {
    Venue.find(function(err, venues) {
        if (err) throw err;
        res.send({
            success: true,
            venues: venues
        });
      });
})

router.get("/vendors", (req, res) => {
    if (req.query.selectedVenueID) {
        Venue.find({'_id': req.query.selectedVenueID}, function(err, venue) {
            if (err) throw err;
            if (venue[0]) {
                return res.send({
                    success: true,
                    vendors: venue[0].vendors
                });
            } else {
                return res.send({
                    success: false,
                    vendors: []
                });
            }
        })
    }
})

router.post("/addVenue", (req, res) => {

    const { name, address } = req.body;

    if (!name || !address) {
        return res.send({
            success: false,
            message: "Please fill in all fields"
          });
    }

    const newVenue = new Venue({
        name,
        address
    });
    console.log(newVenue);
    newVenue.goods = [];

    newVenue.save((error, venue) => {
        console.log(error, venue);
        console.log("This is req.session from /addVenue: " + req.session);
        if (error) {
          return res.send({
            success: false,
            message: "Server error: adding new venue to database"
          });
        } else {
          return res.send({
            success: true,
            message: "Succcessful addition!"
          });
        }
    });
})

router.post("/addVendor", (req, res) => {

    let {name, email, password, password2, venueID} = req.body;
    email = email.toLowerCase();
    
    let errors = [];

    if (!name || !email || !password || !password2) errors.push({ msg: 'Please fill in all fields' });
    if (password !== password2) errors.push({ msg: 'Passwords do not match' });
    if (password.length < 6) errors.push({ msg: "Password should be at least 6 characters" });

    if (errors.length > 0) {
        return res.send({
          success: false,
          message: errors
        });
    }

    let vendors = [];
    Venue.find(function(err, venue) {
        if (err) throw err;
        for (vendor in venue.vendors) {
            vendors.push(vendor);
        }
    })
    console.log(vendors);

    let match = vendors.find((vendor) => vendor.email === email);
    if (match) {
        return res.send({
            success: false,
            messsage: { msg: 'Email is already registered' }
          });
    } else {
        //All fields are correct and email is unique
        const newVendor = {
            name,
            email,
            password
        };

        console.log(newVendor);
        Venue.updateOne({'_id': venueID}, { "$push": {"vendors": newVendor} }, {new: true}, function(err) {
            if (err) {
                return res.send({
                    success: false,
                    message: "Server error: registering new user to database"
                  });
            } else {
                return res.send({
                    success: true,
                    message: "Successful addition!"
                });
            }
        })
    }
})

module.exports = router;