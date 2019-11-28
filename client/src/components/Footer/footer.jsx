import React from 'react';
import logo from './background3.png';
import styles from './styles.css';

class Footer extends React.Component {

    render() {
        return (
            <div id="footer">
                <img src={logo} alt="Logo"/>
            </div>
        );
    }

};

export default Footer;
