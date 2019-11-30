import React from 'react';

function VendorHome(props) {
    return (
        <div className="App">
        	<p>Hello, {props.user.name}! </p>
        	<p> 
        	As a vendor, you can add add goods along with their prices and quantities. 
        	It is also possible to view the orders that you have received. 
        	</p>
        </div>
    );
}

export default VendorHome;