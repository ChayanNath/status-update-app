import { LOGIN_SUCCESS, LOGOUT, SET_AVATAR_URL } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: null,
  avatarUrl: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case SET_AVATAR_URL:
      return {
        ...state,
        avatarUrl: action.payload.avatarUrl,
      };
    default:
      return state;
  }
};

export default authReducer;
