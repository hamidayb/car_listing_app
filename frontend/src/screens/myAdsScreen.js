import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdCard from '../components/adCard';
import Error from '../components/error';
import Loader from '../components/loader';
import SideNotification from '../components/sideNotification';
import { getMyAds } from '../redux/actions/adActions';
import { DELETE_AD_RESET } from '../redux/constants/adConstants';

const MyAdsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    if (!searchParams.get('edit')) {
      setSearchParams({ edit: true });
    }
  }, [searchParams, setSearchParams]);

  const loginUserState = useSelector((state) => state.userLogin);
  const { userInfo } = loginUserState;

  if (!userInfo) {
    navigate({ pathname: '/', search: '?edit=true' });
  }

  const myAds = useSelector((state) => state.myAds);
  const { loading, ads, error } = myAds;

  const { success, error: deleteError } = useSelector(
    (state) => state.deleteAd
  );

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
  return (
    <section className='text-gray-600 body-font'>
      {success && (
        <SideNotification msg='Deleted Successfully' isSuccess={true} />
      )}
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
    </section>
  );
};

export default MyAdsScreen;
