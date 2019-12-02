import React from "react";
import { withRouter, Link } from "react-router-dom";

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
    });
  }

  render() {
    if (!this.state.verified) {
      return (
        <div>
          <p>Authenticating...</p>
          <p>If the page won't load, click <Link to="/home">here</Link></p>
        </div>
      );
    }
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(AuthenticatedComponent);