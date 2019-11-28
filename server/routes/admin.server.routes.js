const express = require('express')
const passport = require('passport')

const router = express.Router();
const Venue = require('../models/baseSchemas/VenueSchema');
const Vendor = require('../models/baseSchemas/VendorSchema');

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

router.get("/goods", (req, res) => {
    if (req.query.selectedVenueID) {
        Venue.find({'_id': req.query.selectedVenueID}, function(err, venue) {
            if (err || !venue[0]) return res.send({
                success: false,
                goods: [],
            })
            else {
                if (req.query.selectedVendorID) {
                    return res.send({
                        success: true,
                        goods: venue[0].vendors.find((vendor) => vendor._id == req.query.selectedVendorID).goods
                    })
                } else return res.send({
                    success: false,
                    goods: []
                })
            }
        })
    } else return res.send({
        success: false,
        goods: []
    })
})

router.post("/addVenue", (req, res) => {

    const { name, address } = req.body;
    const vendors = [];

    if (!name || !address) {
        return res.send({
            success: false,
            message: "Please fill in all fields"
          });
    }

    const newVenue = new Venue({
        name,
        address,
        vendors
    });

    newVenue.save((error, venue) => {
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

    Venue.find(function(err, _) {
        if (err) return res.send({
            success: false,
            message: { msg: 'Server-side error' }
        });
    }).then((venues) => {
        let match = false;
        for (venue of venues) {
            for (vendor of venue.vendors) {
                if (vendor.email === email) match = true;
            }
        }

        if (match) return res.send({
            success: false,
            message: { msg: 'Email is already registered' }
        });

        //Vendor is unique
        else {

            //Append the new vendor to the array stored inside the appropriate venue
            const newVendor = {
                name,
                venueID,
                goods: [],
                orders: []
            }
            Venue.findOneAndUpdate({'_id': venueID}, { "$push": {"vendors": newVendor} }, {new: true}, function(err, venue) {
                if (err) return res.send({
                    success: false,
                    message: "Server error: storing new vendor in venues"
                });
                else return res.send({
                    success: true,
                    linkedID: venue.vendors[venue.vendors.length - 1]._id,
                    message: "Successful addition!"
                });
            })
        }
    })
})

router.post('/regVendor', (req, res) => {
    let { name, email, password, venueID, linkedID } = req.body;
    email = email.toLowerCase();

    const regVendor = new Vendor({
        name,
        email,
        password,
        venueID,
        linkedID
    });

    regVendor.password = regVendor.generateHash(password);
    regVendor.save((error, _) => {
        if (error) {
            return res.send({
            success: false,
            message: "Server error: registering new user to database"
        });
    }
        else {
            return res.send({
            success: true,
            message: "Succcessful registration!"
        });
    }
    });
})

module.exports = router;