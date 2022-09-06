import {
  DELETE_AD_FAIL,
  DELETE_AD_REQUEST,
  DELETE_AD_SUCCESS,
  GET_AD_FAIL,
  GET_AD_REQUEST,
  GET_AD_SUCCESS,
  GET_ALL_ADS_FAIL,
  GET_ALL_ADS_REQUEST,
  GET_ALL_ADS_SUCCESS,
  GET_MY_ADS_FAIL,
  GET_MY_ADS_REQUEST,
  GET_MY_ADS_SUCCESS,
  POST_AD_FAIL,
  POST_AD_REQUEST,
  POST_AD_SUCCESS,
  UPDATE_AD_FAIL,
  UPDATE_AD_REQUEST,
  UPDATE_AD_SUCCESS,
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

export const postAd = (adForm) => async (dispatch) => {
  try {
    dispatch({ type: POST_AD_REQUEST });
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Token ${userInfo.key}`,
      },
    };
    const { data } = await axios.post('/api/carads/my/', adForm, config);
    dispatch({ type: POST_AD_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_AD_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

export const updateAd = (adForm, slug) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_AD_REQUEST });
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Token ${userInfo.key}`,
      },
    };
    const { data } = await axios.put(`/api/carads/my/${slug}/`, adForm, config);
    dispatch({ type: UPDATE_AD_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_AD_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

export const deleteAd = (slug) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_AD_REQUEST });
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        Authorization: `Token ${userInfo.key}`,
      },
    };
    await axios.delete(`/api/carads/my/${slug}`, config);
    setTimeout(() => {
      dispatch({ type: DELETE_AD_SUCCESS });
    }, 0);
  } catch (error) {
    dispatch({
      type: DELETE_AD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
