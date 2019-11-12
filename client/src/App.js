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
      isUser: false,
      isVendor: false,
      isAdmin: false,
    };

    this.handleUser = this.handleUser.bind(this);
    this.handleVendor = this.handleVendor.bind(this);
    this.handleAdmin = this.handleAdmin.bind(this);

  }

  //log in or log off 

  handleUser() {
    if (this.state.isUser === true) {
      this.setState({
        isUser : false
      });
    }
    else {
      this.setState({
        isUser : true
      });
    }
  }

  handleVendor() {
    if (this.state.isVendor === true) {
      this.setState({
        isVendor : false
      });
    }
    else {
      this.setState({
        isVendor : true
      });
    }
  }

  handleAdmin() {
   if (this.state.isAdmin === true) {
      this.setState({
        isAdmin : false
      });
    }
    else {
      this.setState({
        isAdmin : true
      });
    }
  }


  render() {
    return (
      <div>
        <Header isUser = {this.state.isUser} isVendor = {this.state.isVendor} isAdmin = {this.state.isAdmin}/>
        <Switch>

          <Route
            exact path="/home" 
            render={() => 
              <Home isUser = {this.state.isUser} isVendor = {this.state.isVendor} isAdmin = {this.state.isAdmin} />
            }
          />
         
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

           <Route 
              exact path="/login"
              render={() => 
                <Login 
                    handleUser={this.handleUser}
                    handleVendor={this.handleVendor}
                 />
              }
          />

          <Route path="/register" component={Register} />

          <Route path="/users" component={User} />

          <Route component={NotFound}/>

        </Switch>
      </div>
    );
  }
 
}
export default App;
