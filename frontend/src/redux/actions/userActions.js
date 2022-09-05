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
  REGISTER_USER_SUCCESS,
} from '../constants/userConstants';
import axios from 'axios';

export const loginUser = (userEmail, userPassword) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    let obj = {
      email: userEmail,
      password: userPassword,
    };

    const { data } = await axios.post('/api/users/login/', obj, config);
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data[0]
          : error.message,
    });
  }
};

export const registerUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/users/register/', user, config);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });
    const config = {
      headers: {
        Authorization: 'Token 52c066e4c96fb2a35619ffef701904ec4476b7c7',
      },
    };
    const { data } = await axios.get('/api/users/', config);
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: GET_USER_RESET });
  dispatch({ type: LOGOUT_USER });
};
