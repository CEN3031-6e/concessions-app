This project was deploted using Heroku [https://onlinevendr.herokuapp.com/](https://onlinevendr.herokuapp.com/)
This project used the Passport and PayPal APIs to implement login and payment security, respectively.

To run locally you must use [http://localhost:5000](http://localhost:5000). Use the command 'npm run dev' to launch the app locally. To run on Heroku, use the link [https://onlinevendr.herokuapp.com/](https://onlinevendr.herokuapp.com/)

The file server/config/config.js needs a MongoDB URI when running locally. To change the database connection, the URI in that file must be changed. In addition, the file client/package.json neeeds the line "proxy": "http://localhost:5000" in order for the app to work locally. If pushing the file client/package.json to master for Heroku to use, that proxy line must be removed.

Database is updated automatically through the addition/deletion of a venue, vendor or good, and the cart and orders update as the user adds/deletes an item to the cart or pays for the order, and the vendor completes the order

## _**GitHub Issues**_
Place all bugs here

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

## Passport API
- For the login mechanisms of the website, we borrowed the Passport API that was given to us in the class lectures, located at 

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