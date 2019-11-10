import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className='topnav'>           

            {/* Page Links */}
            <div className="topnav-right">
                <Link className="topnav-link" to='/home'>Home</Link>
                <Link className="topnav-link" to='/users'>Users</Link>
                <Link className="topnav-link" to='/vendors'>Vendors</Link>
            </div>
        </div>
    )
}

export default Header;