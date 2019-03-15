import { generalConstant } from "../constants";

export function general(state = {}, action) {
  switch (action.type) {
    case generalConstant.START_REQUEST:
      return {
        loading: true
      };
    case generalConstant.SUCCESS_REQUEST:
      return {
        error: "",
        loading: false
      };
    case generalConstant.FAILURE_REQUEST:
      return {
        error: action.error || "",
        loading: false
      };
    default:
      return state;
  }
}
