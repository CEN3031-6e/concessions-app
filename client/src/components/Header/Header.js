import React from 'react';
import './Header.css';
import DefaultHeader from './DefaultHeader'
import UserHeader from './UserHeader'

/*
import VendorHeader from './VendorHeader'
import AdminHeader from './AdminHeader'
*/

const Header = (props) => {

    let view = <DefaultHeader/>

    

    if(props.isUser === true) {
        view = <UserHeader/>;
    }

    /*
    else if (props.isVendor === true) {
        view = <VendorHeader/>;
    }
    else if (props.isAdmin === true) {
        view = <AdminHeader/>;
    } 

    */

    return (
        <div className='mainNav'>           
            {view}
        </div>
    )

}

export default Header;