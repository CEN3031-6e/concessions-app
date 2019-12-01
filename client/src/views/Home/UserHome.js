import React from 'react';

function UserHome(props) {
    return (
        <div className="App">
        	<h1 className = "h2">Hello, {props.user.name}! </h1>
        	<h2 className = "defaultSlogan"> 
        	As a customer, you can select venues, vendors, and goods. 
        	It is also possible to view your order history. 
        	Go ahead and give Vendr a try!
        	</h2>
        </div>
    );
}

export default UserHome;