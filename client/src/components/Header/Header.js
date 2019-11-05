import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className='topnav'>           

            {/* Page Links */}
            <div className="topnav-right">
                <Link className="topnav-link" to="/home">Home</Link>
                <Link className="topnav-link" to='/user'>User</Link>
                <Link className="topnav-link" to='/vendor'>Vendor</Link>
                <Link className="topnav-link" to='/admin'>Admin</Link>
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
