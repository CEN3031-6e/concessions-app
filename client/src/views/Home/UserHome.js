import React from 'react';

function UserHome(props) {

    let p1;
    if (props.user.email === 'cen3031@ufl.edu') {
        p1 = <p> As an administrator, you can add and remove venues and vendors. </p>;
    }
    else {
        p1 = 
            <p> 
            As a customer, you can select venues, vendors, and goods. 
            It is also possible to view your order history. 
            Go ahead and give Vendr a try!
            </p>;
    }

    return (
        <div className="App">
        <p>Hello, {props.user.name}! </p>
        {p1}
        </div>
    );
}

export default UserHome;