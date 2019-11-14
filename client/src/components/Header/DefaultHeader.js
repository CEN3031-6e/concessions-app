import React from 'react';

const DefaultHeader = (props) => {

	return(

      <nav className="toolbarNavigation"> 

      	<div> </div> 

      	<div className='VendrLogo'>
            	<a href='/home'> Vendr </a>
        </div>

        <div className='toolbarMenu'> 
        	<ul>
        		<li> 
        			<a href='/login'>Login</a>
        		</li>

        		<li>
        			<a href='/register'>Sign up</a> 
        		</li>
        	</ul>

        </div>

      </nav>
            
	)

}

export default DefaultHeader;