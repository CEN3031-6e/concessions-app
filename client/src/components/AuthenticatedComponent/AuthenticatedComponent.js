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