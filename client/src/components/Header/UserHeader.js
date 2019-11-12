import React from 'react';

const UserHeader = (props) => {

	return(

      <nav className="toolbarNavigation"> 

      	<div> </div>

      	<div className='VendrLogo'>
            	<a href='/home'> Vendr </a>
        </div>

        <div className='toolbarMenu'> 
        	<ul>
        		<li> 
        			<a href='/users'>Order</a>
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