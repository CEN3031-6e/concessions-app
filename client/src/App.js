import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom'
import axios from 'axios'
import history from './history'
import Header from "./components/Header/Header"
import Home from "./views/Home/Home"
import User from "./views/User/User"
import Vendor from "./views/Vendor/Vendor"
import Register from "./views/Register/Register"
import NotFound from "./views/NotFound"
import Login from "./views/Login/Login"
import AuthenticatedComponent from "./components/AuthenticatedComponent/AuthenticatedComponent"
import Protected from "./components/ProtectedRoute/ProtectedRoute"
import Footer from './components/Footer/footer'


class App extends React.Component {

  constructor(props) {
    super(props);

    this.getUser = this.getUser.bind(this);
    this.login = this.login.bind(this);
    this.verify = this.verify.bind(this);
    this.logout = this.logout.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setUserRole = this.setUserRole.bind(this);

    this.state = {
      loggedIn: false,
      user: {},
      userRole: ''
    };
  }

  setUserRole(userRole) {
      if (userRole == 'user') {
        this.setState({userRole: 'user'});
      }
      else if (userRole == 'vendor') {
        this.setState({userRole: 'vendor'});
      }
      else {
        this.setState({userRole: ''});
      }
  }

  getUser() {
    axios.get("/users/").then(response => {
      console.log("Getting user: " + response);
      console.log("Get user response: ");
      console.log("This is the get response.data: " + response.data);
      if (response.data) {
        console.log("Get User: There is a user saved in the server session: ");
        console.log("Setting user from getUser");
        this.setState({
          loggedIn: response.data.loggedIn,
          user: response.data.user
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          user: {}
        });
      }
    });
  }

  login(route, user, cb) {
    //in production a .catch(err => console.log(err)) should be implemented
    axios.post(route, user).then(response => {
      //set own state and execute the callback

      if (response.data.success) {
        this.setState({
          loggedIn: true
        });

        //console.log(`Successfully logged in! ${JSON.stringify(response.data)}`);
      }
      cb(response.data);
    })
    .catch(error => {
      cb({});
    });
  }

  verify(route, cb) {
    axios.get(route).then(response => {
      //on success res.data has: success, message, user.name, user.email, user.logggedIn
      console.log(response.data);
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
  logout(route, redirTo) {
    axios.post(route).then(response => {
      //console.log("logout: " + response);
      //console.log(response.data);
      if (response.data.success) {
        this.setState({
          loggedIn: false,
          user: {}
        });
        //console.log("Logout was successful!");
        window.location = redirTo;
      } else {
        //console.log("Logout out failed - server error");
      }
    });
  }

  updateUser(user) {
    this.setState({ loggedIn: user.loggedIn, user: user });
  }

  componentDidMount() {
    //this.getUser();
  }

  render() {
    return (
      <Router history={history}>
        <Header user={this.state.user} loggedIn={this.state.loggedIn} updateUser={this.updateUser} logout={this.logout}/>
        <Switch>

          <Route
            exact path="/home" 
            render={(props) => <Home userType={this.state.userRole} user={this.state.user} />}
          />
          <Route exact path="/"><Redirect to="/home"/></Route>
          <Route exact path="/register" render={() => <Register loggedIn={this.state.loggedIn}/>}/>
          <Route exact path="/login" render={() => <Login setUserRole={this.setUserRole} loggedIn={this.state.loggedIn} login={this.login}/>}/>
          <AuthenticatedComponent verify={this.verify}>
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
          </AuthenticatedComponent>
          <Route component={NotFound}/>
        </Switch>
        <Footer />
      </Router>
    );
  }
}
export default App;
