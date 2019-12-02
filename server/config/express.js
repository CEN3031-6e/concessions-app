const path = require('path'),
    express = require('express'),
    mongooseSetup = require('./database'),
    session = require("express-session"),
    MongoStore = require("connect-mongo")(session)
    passport = require("passport")
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    userRouter = require('../routes/users.server.routes'),
    vendorRouter = require('../routes/vendors.server.routes'),
    adminRouter = require('../routes/admin.server.routes');

module.exports.init = () => {
    mongooseSetup.start(); //starts the database
    
    //Passport config
    require("./passport")(passport);

    // initialize app
    const app = express();
    app.set("trust proxy", true);

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.json());

    //Express session middleware
    app.use(
        session({
        name: "sid",
        resave: false,
        saveUninitialized: false,
        secret: "secret",
        store: new MongoStore({ mongooseConnection: mongooseSetup.connection }),
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 1 // 1 day
        }
        })
    );
    
    //passport middleware
    app.use(passport.initialize());
    app.use(passport.session());
    
    //Globals
    app.use((req, res, next) => {
        if (req.session) {
        res.locals.session = req.session;
        }
        next();
    });
    
    //Routes
    app.use('/users', userRouter);
    app.use('/vendors', vendorRouter);
    app.use('/admin', adminRouter);

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app;
}


