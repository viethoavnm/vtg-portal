import React from 'react';
import { connect } from 'react-redux';
import { requestLogout } from 'utils/redux';

class Register extends React.Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return null;
  }
}

export default connect(null, { logout: requestLogout })(Register);