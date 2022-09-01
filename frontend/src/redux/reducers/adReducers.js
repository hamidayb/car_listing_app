import {
  GET_ALL_ADS_FAIL,
  GET_ALL_ADS_REQUEST,
  GET_ALL_ADS_SUCCESS,
} from '../constants/adConstants';

export const allAdsReducer = (state = {}, action) => {
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
