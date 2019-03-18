import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { store } from "./helpers/store";
//do something...
import PropTypes from "prop-types";

class App extends Component {
  componentDidMount() {
    store.subscribe(() => {
      const user = store.getState().get("user");
      //const token = store.getState().get("token");
      this.setState({ user });
    });
  }
  render() {
    const { token, user } = this.props;
    console.log("token: " + token + " user: " + user);
    return (
      <div>
        {!token && !user ? (
          <Redirect to="/login" />
        ) : (
          <Redirect to="/sidebar" />
        )}
      </div>
    );
  }
}

App.propTypes = {
  token: PropTypes.string
};
const mapStateToProps = state => {
  const user = state.authentication.user || state.user;
  const token = state.authentication.token;
  const { loggedIn } = state.authentication.user;
  const { loading, error } = state.general;
  return {
    loggedIn,
    user,
    token,
    loading,
    error
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
