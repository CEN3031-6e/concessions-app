import React from 'react';
import {Redirect} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {Card} from 'react-bootstrap'

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
				<center>
				<p> WELCOME VENDOR </p>
		       		<form onSubmit={this.loginAttempt}>
				   		<label className = "vendorUsernameLabel"> Username: </label>
						   <div class="col-sm-4">
						   <input 
						   	class="form-control"
		       				id= 'username'
		       				type='text' 
		       				value={this.state.username} 
		       				onChange={this.changeUsername}
		       			/>
						   </div>
						<p>
		       			<label> Password: </label>
						   <div class="col-sm-4">
						   <input 
						    class="form-control"
						    id= 'password'
		       				type="password" 
		       				value={this.state.password} 
		       				onChange={this.changePassword}
		       			/> 
						   </div>
						</p>
						<Card style={{ width: '14rem' }}>
							<Button className="userLoginButton">Log in</Button>
						</Card>
		       			
		       	</form>
				</center>
	       	</div>


	       	
   	    );
	}
}

export default VendorLogin;