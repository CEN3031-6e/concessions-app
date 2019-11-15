import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom'
import Home from "./views/Home/Home"
import User from "./views/User/User"
import Register from "./views/Register/Register"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import Login from "./views/Login/Login"


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null
    };

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);

  }

  logIn(user) {
    console.log("Updating user's state");
    this.setState({user: user});
  }
  logOut = () => this.setState({user: null});

  render() {
    console.log("Rerendering App.js");
    let username = this.state.user ? this.state.user.name : '';
    let adminPriv = this.state.user ? (this.state.user.email === 'cen3031@ufl.edu' && this.state.user.password === 'group6eROX') : false;
    return (
      <div>
        <Header loginState={this.state.user} logOut={this.logOut}/>
        <Switch>

          <Route exact path="/home" component={Home}/>
          <Route exact path="/"><Redirect to="/home"/></Route>
          <Route exact path="/login" render={() => <Login logIn={this.logIn}/>}/>
          <Route exact path="/register" render={() => <Register />}/>
          <Route path="/users" render={() => <User username={username} adminPriv={adminPriv}/>}/>
          <Route component={NotFound}/>

        </Switch>
      </div>
    );
  }
 
}
export default App;
