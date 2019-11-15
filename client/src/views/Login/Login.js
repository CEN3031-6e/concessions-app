import React from 'react'
import axios from 'axios'
import { Redirect, withRouter } from 'react-router-dom'
import './Login.css'

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.setRoleUser = this.setRoleUser.bind(this);
    this.setRoleVendor = this.setRoleVendor.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      role: null,
      email: '',
      password: '',
      loginError: '',
      isLoading: false,
      redirTo: null,
      user: null
    };
  }

  setRoleUser = () => this.setState({role: 'User'});
  setRoleVendor = () => this.setState({role: 'Vendor'});
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
    if (user.role === 'User') {
      axios.post('/users/login', user).then(res => {
        if (res.data.success) {

          user.id = res.data.id;
          user.name = res.data.name;
          this.setState({
            email: '',
            password: '',
            loginError: '',
            isLoading: false,
            redirTo: `/users/${user.id}`
          });
          this.props.logIn(user);

        } else {
          this.setState({
            email: '',
            password: '',
            loginError: res.data.message,
            isLoading: false
          });
        }
      })
    } 

    //Vendor login
    else {
      axios.post('/vendors/login', user).then(res => {
        if (res.data.success) {
          this.setState({
            email: '',
            password: '',
            loginError: '',
            isLoading: false,
            redirTo: '/vendors'
          });

          user.id = res.data.id;
          user.name = res.data.name;
          this.props.logIn(user);
  
        } else {
          this.setState({
            email: '',
            password: '',
            loginError: res.data.message,
            isLoading: false
          });
        }
      })
    }
  }
  
  render() {

    if (this.state.redirTo) return <Redirect to={this.state.redirTo}/>;
    if (this.state.isLoading) return <p>Loading...</p>

    if (!this.state.role) {
      return (
        <div>
          <button className="loginButton" onClick={this.setRoleUser}>User</button>
          <button className="loginButton" onClick={this.setRoleVendor}>Vendor</button>
        </div>
      );
    }

    return (
      <div className="login-view-container">
        <div className="login-container">
          <div className="login-input-container">
            <h3>{this.state.role} Login</h3>
            <br />
          </div>
          {this.state.loginError ? <p>{this.state.loginError}</p> : null}
          <form
            onSubmit={e => this.onSubmit(e)}
            className="login-form-container"
          >
            <div className="login-input-container">
              <label htmlFor="email"></label>
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
            <div className="login-input-container">
              <label htmlFor="password"></label>
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
            <div className="login-input-container">
              <input type="submit" value="Login" className="login-button" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);