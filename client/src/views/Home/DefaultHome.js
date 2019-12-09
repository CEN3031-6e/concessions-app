import React from 'react';

// Default home page before a user (user, vendor, or admin) logs in 

function DefaultHome() {
    return (
        <div className="App">
        	<h1 className="h1" >Welcome to Vendr</h1>
            <h2 className="defaultSlogan">Tired of the long lines? Don't stress!</h2>
        </div>
    );
}

export default DefaultHome;