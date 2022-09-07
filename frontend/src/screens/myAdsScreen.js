import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import AdCard from '../components/adCard';
import Error from '../components/error';
import Loader from '../components/loader';
import SideNotification from '../components/sideNotification';
import { getMyAds } from '../redux/actions/adActions';
import { DELETE_AD_RESET } from '../redux/constants/adConstants';

const MyAdsScreen = () => {
  const [createError, setCreateError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams({});

  const loginUserState = useSelector((state) => state.userLogin);
  const { userInfo } = loginUserState;

  const myAds = useSelector((state) => state.myAds);
  const { loading, ads, error } = myAds;

  const { success, error: deleteError } = useSelector(
    (state) => state.deleteAd
  );

  // if (error) {
  //   console.log(error && error);
  // }

  useEffect(() => {
    if (!userInfo) {
      navigate({ pathname: '/' });
    }
    if (!searchParams.get('edit')) {
      setSearchParams({ edit: true });
    }
  }, [searchParams, setSearchParams, navigate, userInfo]);

  useEffect(() => {
    dispatch(getMyAds());
    if (success) {
      setTimeout(() => {
        dispatch({ type: DELETE_AD_RESET });
      }, 3000);
    }

    return () => {
      clearTimeout();
    };
  }, [dispatch, userInfo, success]);

  const createAdButtonHandler = () => {
    if (ads.length < 5) {
      navigate('create');
    } else {
      setCreateError('Sorry! You have reached max ad limit');
      setTimeout(() => {
        setCreateError();
      }, 3000);
    }
  };
  return (
    <section className='text-gray-600 body-font'>
      {success && (
        <SideNotification msg='Deleted Successfully' isSuccess={true} />
      )}
      {createError && <SideNotification msg={createError} isSuccess={false} />}
      {deleteError && <SideNotification msg={deleteError} isSuccess={false} />}
      <div className='container px-5 py-5 mx-auto'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error errorMsg={error} />
        ) : (
          <div className='flex flex-wrap -m-4'>
            {ads.map((ad, index) => (
              <AdCard key={index} ad={ad} />
            ))}
          </div>
        )}
      </div>
      <button
        className='fixed z-90 bottom-20 right-8 bg-indigo-500 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-indigo-700 hover:drop-shadow-2xl hover:animate-bounce duration-300'
        onClick={createAdButtonHandler}
      >
        <FontAwesomeIcon icon={faAdd} />
      </button>
    </section>
  );
};

export default MyAdsScreen;
