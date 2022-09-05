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
