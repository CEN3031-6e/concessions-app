import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css';

class Header extends React.Component {

    render() {

        let l1 = this.props.loginState ? <Link to="/">{this.props.loginState.email}</Link> : <Link to="/login">Login</Link>
        let l2 = this.props.loginState ? <Link to="/" onClick={this.props.logOut}>Log Out</Link> : <Link to="/register">Register</Link>
        
        return (
            <div className='mainNav'>
                <nav className="toolbarNavigation">
                    <div className='VendrLogo'><Link to='/home'> Vendr </Link></div>
                    <div className='toolbarMenu'> 
                        <ul>
                            <li>{l1}</li>
                            <li>{l2}</li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;