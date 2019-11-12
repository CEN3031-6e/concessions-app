import React from 'react';
import { Link } from "react-router-dom";


const UserHeader = (props) => {

	return(

      <nav className="toolbarNavigation"> 

      	<div> </div>

      	<div className='VendrLogo'>
            	<Link to='/home'> Vendr </Link>
        </div>

        <div className='toolbarMenu'> 
        	<ul>
        		<li> 
        			<Link to='/users'>Order</Link>
        		</li>

        		<li>
        			<a href='/home'>Log out</a> 
        		</li>
        	</ul>

        </div>

      </nav>
            
	)

}

export default UserHeader;
