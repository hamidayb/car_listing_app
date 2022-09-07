import {
  DELETE_AD_FAIL,
  DELETE_AD_REQUEST,
  DELETE_AD_RESET,
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
  POST_AD_RESET,
  POST_AD_SUCCESS,
  UPDATE_AD_FAIL,
  UPDATE_AD_REQUEST,
  UPDATE_AD_RESET,
  UPDATE_AD_SUCCESS,
} from '../constants/adConstants';

export const getAllAdsReducer = (state = { ads: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ADS_REQUEST:
      return { loading: true, ...state };
    case GET_ALL_ADS_SUCCESS:
      return { loading: false, ads: action.payload };
    case GET_ALL_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_AD_REQUEST:
      return { loading: true, ...state };
    case GET_AD_SUCCESS:
      return { loading: false, adInfo: action.payload };
    case GET_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getMyAdsReducer = (state = { ads: [] }, action) => {
  switch (action.type) {
    case GET_MY_ADS_REQUEST:
      return { loading: true, ...state };
    case GET_MY_ADS_SUCCESS:
      return { loading: false, ads: action.payload };
    case GET_MY_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postAdReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_AD_REQUEST:
      return { loading: true, ...state };
    case POST_AD_SUCCESS:
      return { loading: false, success: true };
    case POST_AD_FAIL:
      return { loading: false, error: action.payload };
    case POST_AD_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteAdReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_AD_REQUEST:
      return { loading: true, ...state };
    case DELETE_AD_SUCCESS:
      return { loading: false, success: true };
    case DELETE_AD_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_AD_RESET:
      return {};
    default:
      return state;
  }
};

export const updateAdReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_AD_REQUEST:
      return { loading: true, ...state };
    case UPDATE_AD_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_AD_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_AD_RESET:
      return {};
    default:
      return state;
  }
};
