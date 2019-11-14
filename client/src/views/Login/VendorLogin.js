import React from 'react';
import {Redirect} from 'react-router-dom'

class VendorLogin extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			gotoHome: false
		}

		this.changeUsername = this.changeUsername.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.loginAttempt = this.loginAttempt.bind(this);
	}

	changeUsername = (event) => {
		this.setState({username: event.target.value});
	}

	changePassword = (event) => {
		this.setState({password: event.target.value});
	}


	loginAttempt(event) {
		//needs error handling and login verification
		
		event.preventDefault();
		//const data = new FormData(event.target);

		//skip verification for now

		this.props.handleVendor();
		this.setState({gotoHome: true});



	}
	render() {

		if(this.state.gotoHome === true) {
			return <Redirect to='/home' />
		}
		return (

			<div>

				<p> Welcome, vendor! </p>

		       <form onSubmit={this.loginAttempt}>

		       			<label> Username: </label>
		       			<input 
		       				id= 'username'
		       				type='text' 
		       				value={this.state.username} 
		       				onChange={this.changeUsername}
		       			/>

		       			<label> Password: </label>
		       			<input 
		       				type="text" 
		       				value={this.state.password} 
		       				onChange={this.changePassword}
		       			/> 

		       			<button>Log in</button>
		       	</form>

	       	</div>


	       	
   	    );
	}
}

export default VendorLogin;