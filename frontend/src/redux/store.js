import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  deleteAdReducer,
  getAdReducer,
  getAllAdsReducer,
  getMyAdsReducer,
  postAdReducer,
  updateAdReducer,
} from './reducers/adReducers';
import {
  getUserReducer,
  loginUserReducer,
  registerUserReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  allAds: getAllAdsReducer,
  ad: getAdReducer,
  myAds: getMyAdsReducer,
  userLogin: loginUserReducer,
  getUser: getUserReducer,
  userRegister: registerUserReducer,
  postAd: postAdReducer,
  updateAd: updateAdReducer,
  deleteAd: deleteAdReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
