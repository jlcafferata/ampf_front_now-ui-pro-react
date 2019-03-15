//import config from "config";
import { authHeader } from "../helpers";
import { generalService as gs } from "./../services";
import { userConstants as uc } from "./../constants";
//import axios from "axios";
const config = {
  apiUrl: "http://192.168.0.17:8080"
};
export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
};

function login(email, password) {
  console.log(email + "-" + password);
  return dispatch => {
    //activate the start of the search
    dispatch(gs.startRequest());

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    };

    fetch(`${config.apiUrl}/auth/login`, requestOptions)
      .then(handleResponse)
      .then(user => {
        // login successful if there's a jwt token in the response
        console.log("success: " + user);
        if (user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          user.email = email;
          dispatch({ type: uc.LOGIN_SUCCESS, user });
          dispatch(gs.successRequest());
          //localStorage.setItem("user", JSON.stringify(user));
        }
        return user;
      })
      .catch(function(error) {
        dispatch(gs.failureRequest(error));
      });
  };
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(`${config.apiUrl}/auth/register`, requestOptions).then(
    handleResponse
  );
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(
    handleResponse
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  console.log("handle response");
  console.dir(response);
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      let error = (data && data.message) || response.statusText;
      switch (response.status) {
        case 400:
          error = "Email o password incorrecto";
          break;
        case 401:
          logout();
          window.location.reload(true);
          break;
        default:
          break;
      }
      return Promise.reject(error);
    }

    return data;
  });
}
