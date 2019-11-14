import React from 'react';
import './Home.css';
import DefaultHome from './DefaultHome'
import UserHome from './UserHome'
import VendorHome from './VendorHome'
import AdminHome from './AdminHome'

function Home(props) {

     let pageView = <DefaultHome/>;

    if (props.isUser) {
        pageView = <UserHome/>;
    }
    else if (props.isVendor) {
        pageView = <VendorHome/>;
    }
    else if (props.isAdmin) {
        pageView = <AdminHome/>;
    }
   

    return (
        <div className="App">
        {pageView}
        </div>
    );
}

export default Home;
