import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className='topnav'>           

            {/* Page Links */}
            <div className="topnav-right">
                <Link className="topnav-link" to="/Home">Home</Link>
                <Link className="topnav-link" to='/User'>User</Link>
                <Link className="topnav-link" to='/Vendor'>Vendor</Link>
                <Link className="topnav-link" to='/Admin'>Admin</Link>
            </div>
        </div>
    )
}

export default Header;

/*
{Logo}
<Link id="logo-link" to="/">
<img className="topnav-logo" src={ "/logo192.png" } alt="React logo" />
</Link>
*/
