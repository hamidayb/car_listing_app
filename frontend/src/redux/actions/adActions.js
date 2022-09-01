import {
  GET_ALL_ADS_FAIL,
  GET_ALL_ADS_REQUEST,
  GET_ALL_ADS_SUCCESS,
} from '../constants/adConstants';
import axios from 'axios';

export const fetchAllAds = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ADS_REQUEST });
    const { data } = await axios.get('http://localhost:8000/api/carads/');
    console.log(data);
    dispatch({ type: GET_ALL_ADS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ADS_FAIL,
      error: error.message,
    });
  }
};
