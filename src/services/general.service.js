import { generalConstant as gc } from "./../constants";

export const generalService = {
  startRequest,
  successRequest,
  failureRequest
};

function startRequest() {
  return dispatch => {
    dispatch({
      type: gc.START_REQUEST
    });
  };
}

function successRequest() {
  return dispatch => {
    dispatch({
      type: gc.SUCCESS_REQUEST
    });
  };
}

function failureRequest(error) {
  return dispatch => {
    dispatch({
      type: gc.FAILURE_REQUEST,
      error
    });
  };
}
