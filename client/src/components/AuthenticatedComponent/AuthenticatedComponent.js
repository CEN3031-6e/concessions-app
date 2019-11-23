import React from "react";
import { withRouter } from "react-router-dom";

class AuthenticatedComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      verified: false
    };
  }

  componentDidMount() {
    this.props.verify('/users/verify', data => {
      this.setState({
        verified: data.success
      });
      
      //user is not authorized or their session expired
      //move them to the login page to get a new session
      // if (!data.success) {
      //   console.log("Session ended: " + JSON.stringify(data));
      //   this.props.history.push("/login");
      // } else {
      //   console.log("Authenticated user data: " + JSON.stringify(data));
      // }
    });
  }

  render() {
    if (!this.state.verified) {
      return (
        <div>
          <p>Authenticating...</p>
        </div>
      );
    }
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(AuthenticatedComponent);