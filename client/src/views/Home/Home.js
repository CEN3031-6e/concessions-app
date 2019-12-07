import React from 'react';
import './Home.css';
import Footer from '../../components/Footer/footer'
import DefaultHome from './DefaultHome'
import UserHome from './UserHome'
import VendorHome from './VendorHome'

function Home(props) {

    //render the appropriate home page based on who is logged in
    let pageView = <DefaultHome/>;

    if (props.userType === 'user') {
        pageView = <UserHome user={props.user}/>;
    }
    else if (props.userType === 'vendor') {
        pageView = <VendorHome user={props.user}/>;
    }
   

    return (
        <div className="App">
            {pageView}
            <hr></hr>
            <hr></hr>
        <div className="left">
            <img src="https://floridagators.com/images/2015/12/14//swamp-20121006-lsu_0378.jpg" alt="Ben Hill Griffin Stadium" className="rounded float-left" width="100%" height="100%"></img>
        </div>
        <div className="center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/PGE_Park_concession_stand.JPG/1920px-PGE_Park_concession_stand.JPG" alt="Concession Stand" className="rounded float-center" width="100%" height="100%"></img>
        </div>
        <div className="right">
            <img src="https://venuesnow.com/wp-content/uploads/2018/10/Urban_CIty_Taqueria_-_Citizens_Business_Bank_Arena.jpg" alt="Taqueria" className="rounded float-right" width="100%" height="100%"></img>
        </div>
        <Footer />
        </div>
        
        
    );
}

export default Home;
