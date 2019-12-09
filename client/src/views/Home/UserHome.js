import React from 'react';

// Home page properties after a user logs in; different for admin user sincethey have more capabilities

function UserHome(props) {

    let p1;
    if (props.user.email === 'cen3031@ufl.edu') {
        p1 = <p className = "defaultSlogan"> As an administrator, you can add and remove venues and vendors. </p>;
    }
    else {
        p1 = 
            <p className = "defaultSlogan"> 
            As a customer, you can select venues, vendors, and goods. 
            It is also possible to view your order history. 
            Go ahead and give Vendr a try!
            </p>;
    }

    return (
        <div className="App">

        	<h1 className = "h2">Hello, {props.user.name}! </h1>
        	{p1}
        </div>
    );
}

export default UserHome;