import React from 'react'
import axios from 'axios'
import { Redirect, withRouter } from 'react-router-dom'
import './Login.css'
import {Button} from 'react-bootstrap'

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.setRoleUser = this.setRoleUser.bind(this);
    this.setRoleVendor = this.setRoleVendor.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      role: '',
      email: '',
      password: '',
      loginError: '',
      isLoading: false,
      redirTo: '/login',
      user: {}
    };
  }

  setRoleUser = () => this.setState({role: 'User'});
  setRoleVendor = () => this.setState({role: 'Vendor'});
  resetRole = () => this.setState({role: ''});
  onChange = (e) => this.setState({[e.target.name]: e.target.value});

  onSubmit(e) {
    this.setState({isLoading: true});
    e.preventDefault();

    const { email, password, role } = this.state;
    const user = {
      email,
      password,
      role
    };

    //User login
    if (role === 'User') {
      this.props.login('/users/login', user, data => {
        if (data.success) {
          this.setState({
            email: '',
            password: '',
            loginError: '',
            isLoading: false,
            redirTo: "/users"
          });
          console.log(`Successfully logged in! ${JSON.stringify(data)}`);
        } else {
          this.setState({
            email: '',
            password: '',
            loginError: data.message,
            isLoading: false,
          });
        }
      });
    } 

    //Vendor login
    else if (role === 'Vendor') {
      this.props.login('/vendors/login', user, data => {
        if (data.success) {
          this.setState({
            email: '',
            password: '',
            loginError: '',
            isLoading: false,
            redirTo: '/vendors'
          });
        } else {
          this.setState({
            email: '',
            password: '',
            loginError: data.message,
            isLoading: false
          });
        }
      })
    }
  }
  
  render() {

    if (this.props.loggedIn) return <Redirect to={this.state.redirTo}/>;
    if (this.state.isLoading) return <p>Loading...</p>

    if (!this.state.role) {
      return (
        <div>
          <center>
          <p>
          <h1 className = "login">Login Page</h1>
          </p>
          <p>
          <Button className="loginButton" onClick={this.setRoleUser}>User</Button>
          </p>
          <p>
          <Button className="loginButton" onClick={this.setRoleVendor}>Vendor</Button>
          </p>
          </center>
        </div>
      );
    }

    return (
      <center>
      <div className="login-view-container">
        <div className="login-container">
          <div className="login-input-container">
            <h3 className = "heading">{this.state.role} Login</h3>
            <br />
          </div>
          {this.state.loginError ? <p>{this.state.loginError}</p> : null}
          <form
            onSubmit={e => this.onSubmit(e)}
            className="login-form-container"
          >
            <p>
            <div className="login-input-container">
              <label htmlFor="email"></label>
              <label>Email: </label>
              <div class="col-sm-4">
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                required
                className="login-input"
                value={this.state.email}
                onChange={e => this.onChange(e)}
              />
              </div>
            </div>
            </p>
            <p>
            <div className="login-input-container">
              <label htmlFor="password"></label>
              <label>Password: </label>
              <div class="col-sm-4">
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                required
                className="login-input"
                value={this.state.password}
                onChange={e => this.onChange(e)}
              />
              </div>
            </div>
            </p>
            <p>
            <div className="login-input-container">
              <input type="submit" value="Login" className="userLoginbutton" />
            </div>
            </p>
            <Button className="forgotPassword">Forgot password?</Button>
            <Button className="forgotPassword" onClick={this.resetRole.bind(this)}>Return</Button>
          </form>
        </div>
      </div>
      </center>
            
    );
  }
}

export default withRouter(Login);
