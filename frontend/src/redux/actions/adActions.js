import {
  GET_AD_FAIL,
  GET_AD_REQUEST,
  GET_AD_SUCCESS,
  GET_ALL_ADS_FAIL,
  GET_ALL_ADS_REQUEST,
  GET_ALL_ADS_SUCCESS,
  GET_MY_ADS_FAIL,
  GET_MY_ADS_REQUEST,
  GET_MY_ADS_SUCCESS,
} from '../constants/adConstants';
import axios from 'axios';

export const getAllAds = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ADS_REQUEST });
    const { data } = await axios.get('/api/carads/');
    setTimeout(() => {
      dispatch({ type: GET_ALL_ADS_SUCCESS, payload: data });
    }, 0);
  } catch (error) {
    dispatch({
      type: GET_ALL_ADS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAd = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_AD_REQUEST });
    const { data } = await axios.get(`/api/carads/${slug}`);
    setTimeout(() => {
      dispatch({ type: GET_AD_SUCCESS, payload: data });
    }, 0);
  } catch (error) {
    dispatch({
      type: GET_AD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyAds = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MY_ADS_REQUEST });
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        Authorization: `Token ${userInfo.key}`,
      },
    };
    const { data } = await axios.get('/api/carads/my', config);
    setTimeout(() => {
      dispatch({ type: GET_MY_ADS_SUCCESS, payload: data });
    }, 0);
  } catch (error) {
    dispatch({
      type: GET_MY_ADS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
