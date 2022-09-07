import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../components/loader';
import Error from '../components/error';
import { getAd } from '../redux/actions/adActions';
import { roundOfPrice } from '../utils';

const AdScreen = () => {
  const { slug } = useParams();
  const ad = useSelector((state) => state.ad);
  const { loading, adInfo, error } = ad;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAd(slug));
  }, [dispatch, slug]);
  return (
    <section className='text-gray-600 body-font'>
      <div className='container px-5 py-5 mx-auto flex flex-col'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error errorMsg={error} />
        ) : (
          adInfo && (
            <div className='lg:w-4/6 mx-auto'>
              <div className='rounded-lg overflow-hidden'>
                <img
                  alt='content'
                  className='object-cover object-center h-full w-full'
                  src={`http://localhost:8000${adInfo.image}`}
                />
              </div>
              <h1 className='mt-5 text-gray-900 text-3xl title-font font-medium mb-1'>
                {adInfo.make.concat(' ', adInfo.model, ' (', adInfo.year, ')')}
              </h1>
              <div className='flex flex-col sm:flex-row mt-6'></div>
              <div className='flex gap-x-16 mb-3'>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Model</span>
                    <span className='ml-auto text-gray-900'>
                      {adInfo.model}
                    </span>
                  </div>
                </div>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Make</span>
                    <span className='ml-auto text-gray-900'>{adInfo.make}</span>
                  </div>
                </div>
              </div>
              <div className='flex gap-x-16 mb-3'>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Vehicle Type</span>
                    <select
                      className='ml-auto text-gray-900 text-right bg-gray-50'
                      value={adInfo.type}
                      disabled
                    >
                      <option value='sedan'>Sedan</option>
                      <option value='suv'>SUV</option>
                      <option value='coupe'>Coupe</option>
                      <option value='minivan'>MiniVan</option>
                      <option value='sports_car'>Sports Car</option>
                      <option value='hatchback'>Hatch Back</option>
                      <option value='pickup_trcuk'>Pickup Truck</option>
                    </select>
                  </div>
                </div>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Year</span>
                    <span className='ml-auto text-gray-900'>{adInfo.year}</span>
                  </div>
                </div>
              </div>
              <div className='flex gap-x-16 mb-3'>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Engine Capacity</span>
                    <span className='ml-auto text-gray-900'>
                      {adInfo.engine_capacity ? (
                        <span>{adInfo.engine_capacity} cc</span>
                      ) : (
                        '--'
                      )}
                    </span>
                  </div>
                </div>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Color</span>
                    <span className='ml-auto text-gray-900'>
                      {adInfo.color ? adInfo.color : '--'}
                    </span>
                  </div>
                </div>
              </div>
              <div className='flex gap-x-16 mb-3 '>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Transmission</span>
                    <select
                      className='ml-auto text-gray-900 text-right bg-gray-50'
                      value={adInfo.transmission}
                      disabled
                    >
                      <option value='auto'>Auto</option>
                      <option value='manual'>Manual</option>
                    </select>
                  </div>
                </div>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Condition</span>
                    <select
                      className='ml-auto text-gray-900 text-right bg-gray-50'
                      value={adInfo.condition}
                      disabled
                    >
                      <option value='used'>Used</option>
                      <option value='new'>New</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='flex gap-x-16 mb-3'>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Registration City</span>
                    <span className='ml-auto text-gray-900'>
                      {adInfo.registration_city}
                    </span>
                  </div>
                </div>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Hybrid</span>
                    <select
                      className='ml-auto text-gray-900 text-right'
                      value={adInfo.hybrid || 'mild'}
                      disabled
                    >
                      <option value='full'>Full</option>
                      <option value='mild'>Mild</option>
                      <option value='plugin'>Plug-in</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='flex gap-x-16'>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Fuel</span>
                    <select
                      className='ml-auto text-gray-900 text-right'
                      value={adInfo.fuel || 'petrol'}
                      disabled
                    >
                      <option value='petrol'>Petrol</option>
                      <option value='diesel'>Diesel</option>
                      <option value='cng'>CNG</option>
                      <option value='bio_diesel'>Bio Diesel</option>
                      <option value='lpg'>LPG</option>
                    </select>
                  </div>
                </div>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Distance Covered (km)</span>
                    <span className='ml-auto text-gray-900'>
                      {adInfo.distance_covered ? adInfo.distance_covered : '0'}
                    </span>
                  </div>
                </div>
              </div>
              <div className='flex mt-3'>
                <div className='w-full justify-end'>
                  <div className='flex border-b border-gray-200 '>
                    <span className='text-gray-900 text-lg'>Price(PKR)</span>
                    <span className='ml-auto text-gray-900 text-lg'>
                      <strong>{roundOfPrice(adInfo.price)} LAC</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default AdScreen;
