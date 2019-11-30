import React from 'react';
import './Home.css';
import DefaultHome from './DefaultHome'
import UserHome from './UserHome'
import VendorHome from './VendorHome'
import AdminHome from './AdminHome'
import {Container} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'

function Home(props) {

    let pageView = <DefaultHome/>;

    if (props.userType == 'user') {
        pageView = <UserHome user={props.user}/>;
    }
    else if (props.userType == 'vendor') {
        pageView = <VendorHome user={props.user}/>;
    }
   

    return (
        <div className="App">
            <p>{pageView}</p>
            <hr></hr>
            <hr></hr>
        <div className = "left">
            <img style={{float: "left; margin: 0px 0px 0px 0px"}} src="https://floridagators.com/images/2015/12/14//swamp-20121006-lsu_0378.jpg" alt="Responsive Image" class="rounded float-left" width="450" ></img>
        </div>
        <div className = "center">
            <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/PGE_Park_concession_stand.JPG/1920px-PGE_Park_concession_stand.JPG" alt="Responsive Image" class="rounded float-center" width="390"></img>
        </div>
        <div className = "right">
            <img src = "https://venuesnow.com/wp-content/uploads/2018/10/Urban_CIty_Taqueria_-_Citizens_Business_Bank_Arena.jpg" alt = "Responsive Image" class = "rounded float-right" width = "490" height = "293"></img>
        </div>
        </div>
        
        
    );
}

export default Home;
