import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

//do something...
import PropTypes from "prop-types";

class App extends Component {
  render() {
    const { token } = this.props;
    return (
      <div>
        {!token && <Redirect to="/login" />}
        {token && <Redirect to="/dashboard" />}
      </div>
    );
  }
}

App.propTypes = {
  token: PropTypes.string
};
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  null
)(App);
