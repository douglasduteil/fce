import { LOGIN_USER, LOGOUT_USER, RESET_STORE } from "../constants/ActionTypes";

const initialState = {
  isAuthenticated: false,
  user: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, {
        isAuthenticated: true,
        user: action.user
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isAuthenticated: false,
        user: null
      });
    case RESET_STORE:
      return {};
    default:
      return state;
  }
};

export default auth;
