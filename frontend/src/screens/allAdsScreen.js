import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdCard from '../components/adCard';
import Error from '../components/error';
import Loader from '../components/loader';
import { getAllAds } from '../redux/actions/adActions';

const AllAdsScreen = () => {
  const allAds = useSelector((state) => state.allAds);
  const { loading, ads, error } = allAds;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAds());
  }, [dispatch]);
  return (
    <section className='text-gray-600 body-font'>
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

export default AllAdsScreen;
