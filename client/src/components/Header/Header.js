import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css';

class Header extends React.Component {

    logoutSelect() {
        this.props.logout("/users/logout", "/login");
    }

   

    render() {

        let l1;
        if (this.props.loggedIn) {
            if(this.props.userType === 'user') {
                l1 = <Link to="/users">Order</Link>
            }
            else {
                 l1 = <Link to="/vendors">Manage Store</Link>
            }
        } 
        else {
            l1 = <Link to="/login">Login</Link>
        }
        let l2 = this.props.loggedIn ? <Link to="/login" onClick={this.logoutSelect.bind(this)}>Log Out</Link> : <Link to="/register">Register</Link>
        
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