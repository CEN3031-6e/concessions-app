This project was deploted using Heroku [https://onlinevendr.herokuapp.com/](https://onlinevendr.herokuapp.com/)
This project used the Passport and PayPal APIs to implement login and payment security, respectively.

To run locally you must use [http://localhost:5000](http://localhost:5000). Use the command 'npm run dev' to launch the app locally. To run on Heroku, use the link [https://onlinevendr.herokuapp.com/](https://onlinevendr.herokuapp.com/)

The file server/config/config.js needs a MongoDB URI when running locally. To change the database connection, the URI in that file must be changed. In addition, the file client/package.json neeeds the line "proxy": "http://localhost:5000" in order for the app to work locally. If pushing the file client/package.json to master for Heroku to use, that proxy line must be removed.

Database is updated automatically through the addition/deletion of a venue, vendor or good, and the cart and orders update as the user adds/deletes an item to the cart or pays for the order, and the vendor completes the order

## _**GitHub Issues**_
Place all bugs here



For use in the creation of README (take out before we turn in)
Make a link ["link to be clicked"](link)
## Heading 
_** Marks something important **_


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This project contains an example project board meant to showcase how one can be used. The issues posted to it are not real issues.

## Features Implemented 
- Home page for the application with navigation links
- Users and vendors must pass a login screen to access their information
- Users can view venues, vendors, and goods
- Users can search for venues, vendors, and goods
- Users can register for an account/login
- Users can add/delete goods to their cart
- Implementing a database to store users
- Customizing the application to look compelling
- Landing pages for users and vendors
- Vendors can update their menu 
- Vendors can create menus
- Users can pay for their order through PayPal
- Submitted cart information can be sent to our database
- Users and vendors must pass a login screen to access their information
- Admin can establish new vendors
- Admin can add and delete new venues and vendors

## Stylesheet API
- For styling the website, we used Bootstrap at https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css

## PayPal API
- For the integration of the PayPal checkout, some sample code was borrowed from the PayPal Node SDK GitHub page at https://github.com/paypal/PayPal-node-SDK. Specifically, the borrowed code appears in server/routes/users.server.routes.js. The definition of the defPayment variable in router.post('/pay', (req, res) has sample code from the GitHub page. In addition, the function paypal.payment.create has sample code from the following PayPal Node API tutorial: https://www.youtube.com/watch?v=7k03jobKGXM

- The function paypal.configure in server/routes/users.server.routes.js comes from sample code in https://developer.paypal.com/docs/api/quickstart/environment/

- In router.post('/executepayment', (req, res), the variable execute_payment and the function paypal.payment.execute have sample code from the PayPal Node SDK GitHub page mentioned above.

## Website Screenshots
Note: Not all screens are shown here, but all the functionality is.

- Home Page
![alt text](https://github.com/CEN3031-6e/concessions-app/blob/master/Screenshots/Home%20page.JPG)



- Register
![alt text](https://github.com/CEN3031-6e/concessions-app/blob/master/Screenshots/Register.JPG)



- Login
![alt text](https://github.com/CEN3031-6e/concessions-app/blob/master/Screenshots/Login.JPG)



- Choose Vendor (as user)
![alt text](https://github.com/CEN3031-6e/concessions-app/blob/master/Screenshots/Choose%20Vendor.JPG)



- Make Order (as user)
![alt text](https://github.com/CEN3031-6e/concessions-app/blob/master/Screenshots/User%20Order%20Food.JPG)



- View Cart (as user)
![alt text](https://github.com/CEN3031-6e/concessions-app/blob/master/Screenshots/User%20View%20Cart.JPG)



- View Orders (as user)
![alt text](https://github.com/CEN3031-6e/concessions-app/blob/master/Screenshots/User%20View%20Orders.JPG)



- Pay Order (as user)
![alt text](https://github.com/CEN3031-6e/concessions-app/blob/master/Screenshots/Pay%20Order.JPG)



- Pay Order with API (as user)
![alt text](https://github.com/CEN3031-6e/concessions-app/blob/master/Screenshots/User%20PayPal%20Checkout.png)



- View, Add, or Delete Goods (as vendor)
![alt text](https://github.com/CEN3031-6e/concessions-app/blob/master/Screenshots/Vendor%20Add%20or%20Delete%20Goods.JPG)



- View Orders (as vendor)
![alt text](https://github.com/CEN3031-6e/concessions-app/blob/master/Screenshots/Vendor%20View%20Orders.png)



- View Specific Order(as vendor)
![alt text](https://github.com/CEN3031-6e/concessions-app/blob/master/Screenshots/Vendor%20View%20or%20Complete%20Order.png)



- Add or Remove Venues (as admin)
![alt text](https://github.com/CEN3031-6e/concessions-app/blob/master/Screenshots/Admin%20Manage%20Venues.JPG)



- Add or Remove Vendors (as admin) 
![alt text](https://github.com/CEN3031-6e/concessions-app/blob/master/Screenshots/Admin%20Add%20Remove%20Vendor.JPG)



## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components.
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `config` - This holds our configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `tests` - This holds all of our server tests that we have defined
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!


## Available Scripts

In the project directory, you can run:

### `npm run-script dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run-script client`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


### `npm run-script server`

Runs just the server in development mode.<br>


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

If deploying to heroku this does not need to be run since it is handled by the heroku-postbuild script<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

