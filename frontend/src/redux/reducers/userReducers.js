import {
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_RESET,
  GET_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_RESET,
  REGISTER_USER_SUCCESS,
} from '../constants/userConstants';

export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { loading: true };
    case LOGIN_USER_SUCCESS:
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return { loading: false, userInfo: action.payload };
    case LOGIN_USER_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};

export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { loading: true };
    case REGISTER_USER_SUCCESS:
      return { loading: false, success: true };
    case REGISTER_USER_FAIL:
      return { loading: false, error: action.payload };
    case REGISTER_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const getUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { loading: true };
    case GET_USER_SUCCESS:
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return { loading: false, userInfo: action.payload };
    case GET_USER_FAIL:
      return { loading: false, error: action.payload };
    case GET_USER_RESET:
      return {};
    default:
      return state;
  }
};
