import React from 'react';
import UserLogin from './UserLogin'
import VendorLogin from './VendorLogin'
import './Login.css'

class Login extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      isUser: false,
	      isVendor: false,
	      isAdmin: false,
	    };

	     this.userClick = this.userClick.bind(this);
	     this.vendorClick = this.vendorClick.bind(this);

	    
	    // this.adminClick = this.adminClick.bind(this); //to be implemented

	}

	userClick() {
		this.setState({isUser: true})

	}

	vendorClick() {
		this.setState({isVendor: true});

	}

	//adminClick(event) {

	//}

	render() {

		if (this.state.isUser === true) {
			return(
				<UserLogin handleUser={this.props.handleUser}/>
			)
		}
		else if (this.state.isVendor === true) {
			return(
				<VendorLogin handleVendor={this.props.handleVendor}/>
			)
		}
		else {
			return(
				<div>
					<button className='loginButton' onClick={this.userClick}>
						User
					</button>

					<button className='loginButton' onClick={this.vendorClick}>
						Vendor
					</button>

				</div>
			)
		}


	}

}

export default Login;