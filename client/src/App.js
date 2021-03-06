import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import axios from 'axios'
import history from './history'
import Header from "./components/Header/Header"
import Home from "./views/Home/Home"
import User from "./views/User/User"
import Vendor from "./views/Vendor/Vendor"
import Register from "./views/Register/Register"
import NotFound from "./views/NotFound/NotFound"
import Login from "./views/Login/Login"
import AuthenticatedComponent from "./components/AuthenticatedComponent/AuthenticatedComponent"
import Protected from "./components/ProtectedRoute/ProtectedRoute"
import LoadingPaypal from "./components/User/LoadingPaypal"

class App extends React.Component {

  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.verify = this.verify.bind(this);
    this.logout = this.logout.bind(this);
    this.setUserRole = this.setUserRole.bind(this);

    this.state = {
      loggedIn: false,
      user: {},
      userRole: ''
    };
  }

  //Control whether the logged in person is a user or vendor
  setUserRole(userRole) {
      if (userRole === 'user') {
        this.setState({userRole: 'user'});
      }
      else if (userRole === 'vendor') {
        this.setState({userRole: 'vendor'});
      }
      else {
        this.setState({userRole: ''});
      }
  }

  //Log a user in
  login(route, user, cb) {
    axios.post(route, user).then(response => {

      if (response.data.success) {
        this.setState({
          loggedIn: true
        });
      }
      cb(response.data);
    })
    .catch(error => {
      cb({});
    });
  }

  //Verify that the user is logged in
  verify(route, cb) {
    axios.get(route).then(response => {
      if (!response.data.success) {
        this.setState({
          loggedIn: response.data.user.loggedIn,
          user: response.data.user
        });
      } else {
        this.setState({
          user: response.data.user,
          loggedIn: response.data.user.loggedIn
        });
      }
      cb(response.data);
    });
  }

  //Log a user out
  logout(route, redirTo) {
    axios.post(route).then(response => {
      if (response.data.success) {
        this.setState({
          loggedIn: false,
          user: {}
        });
        window.location = redirTo;
      } else {}
    });
  }

  //Render the appropriate route
  render() {
    return (
      <Router history={history}>
        <Header user={this.state.user} userType={this.state.userRole} loggedIn={this.state.loggedIn} updateUser={this.updateUser} logout={this.logout}/>
        <Switch>
          <Route
            exact path="/home" 
            render={() => <Home userType={this.state.userRole} user={this.state.user} />}
          />
          <Route exact path="/"><Redirect to="/home"/></Route>
          <Route path="/success" render={() => <LoadingPaypal/>}/>
          <Route path="/failure" render={() => <p>Payment failed.</p>}/>
          <Route exact path="/register" render={() => <Register loggedIn={this.state.loggedIn}/>}/>
          <Route exact path="/login" render={() => <Login setUserRole={this.setUserRole} loggedIn={this.state.loggedIn} login={this.login}/>}/>
          <AuthenticatedComponent verify={this.verify}>
            <Switch>
              <Route
                path="/users"
                render={() => (
                  <User
                    loggedIn={this.state.loggedIn}
                    user={this.state.user}
                    logout={this.logout}
                  />
                )}
              />
              <Route
                path="/vendors"
                render={() => (
                  <Vendor
                    loggedIn={this.state.loggedIn}
                    vendor={this.state.user}
                    logout={this.logout}
                  />
                )}
              />
              <Route path="/protected" component={Protected} />
              <Route component={NotFound} />
            </Switch>
          </AuthenticatedComponent>
        </Switch>
      </Router>
    );
  }
}
export default App;
