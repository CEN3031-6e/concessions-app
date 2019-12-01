import React from 'react';
import logo from './background3.png';
import './styles.css';

class Footer extends React.Component {

    render() {
        return (
            // <div id="footer">
            //     <img src={logo} alt="Logo"/>
            // </div>
            <div className="footer-div"><img className="logo" src={logo} alt="Logo" height="100%"/></div>
        );
    }

};

export default Footer;
