import React from 'react';

function UserHome(props) {
    return (
        <div className="App">
        	<p>Hello, {props.user.name}! </p>
        	<p> 
        	As a customer, you can select venues, vendors, and goods. 
        	It is also posible to view your order history. 
        	Go ahead and give Vendr a try!
        	</p>
        </div>
    );
}

export default UserHome;