import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../components/loader';
import Error from '../components/error';
import { getAd } from '../redux/actions/adActions';

const getYearArr = () => {
  const currentYear = new Date().getFullYear();
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  const yearArr = range(currentYear, currentYear - 40, -1);
  return yearArr;
};

const EditAdScreen = () => {
  const [adObj, setAdObj] = useState(null);
  const { slug } = useParams();
  const edit = true;

  const dispatch = useDispatch();

  const { loading, adInfo, error } = useSelector((state) => state.ad);

  useEffect(() => {
    if (adInfo && !adObj) {
      setAdObj(adInfo);
    }
    if (!adInfo) {
      dispatch(getAd(slug));
    }
  }, [dispatch, slug, adInfo, adObj]);

  const submitHandler = () => {
    
  };

  return (
    <section className='text-gray-600 body-font'>
      <div className='container px-5 py-5 mx-auto flex flex-col'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error errorMsg={error} />
        ) : (
          adObj && (
            <div className='lg:w-4/6 mx-auto'>
              <div className='rounded-lg overflow-hidden'>
                <img
                  alt='content'
                  className='object-cover object-center h-full w-full'
                  src='https://dummyimage.com/760x300'
                />
              </div>
              <h1 className='mt-5 text-gray-900 text-3xl title-font font-medium mb-1'>
                {adObj.make.concat(' ', adObj.model, ' (', adObj.year, ')')}
              </h1>
              <div className='flex flex-col sm:flex-row mt-6'></div>
              <div className='flex gap-x-16 mb-3'>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Model</span>
                    {edit ? (
                      <input
                        type='text'
                        className='ml-auto text-gray-900 text-right'
                        value={adObj.model}
                        onChange={(e) =>
                          setAdObj((prevAd) => ({
                            ...prevAd,
                            model: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <span className='ml-auto text-gray-900'>
                        {adObj.model}
                      </span>
                    )}
                  </div>
                </div>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Make</span>
                    {edit ? (
                      <input
                        type='text'
                        className='ml-auto text-gray-900 text-right'
                        value={adObj.make}
                        onChange={(e) =>
                          setAdObj((prevAd) => ({
                            ...prevAd,
                            make: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <span className='ml-auto text-gray-900'>
                        {adObj.make}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex gap-x-16 mb-3'>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Vehicle Type</span>
                    {edit ? (
                      <select
                        className='ml-auto text-gray-900 text-right'
                        onChange={(e) =>
                          setAdObj((prevAd) => ({
                            ...prevAd,
                            type: e.target.value,
                          }))
                        }
                        value={adObj.type}
                      >
                        <option value='sedan'>Sedan</option>
                        <option value='suv'>SUV</option>
                        <option value='coupe'>Coupe</option>
                        <option value='minivan'>MiniVan</option>
                        <option value='sports_car'>Sports Car</option>
                        <option value='hatchback'>Hatch Back</option>
                        <option value='pickup_trcuk'>Pickup Truck</option>
                      </select>
                    ) : (
                      <span className='ml-auto text-gray-900'>
                        {adObj.type}
                      </span>
                    )}
                  </div>
                </div>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Year</span>
                    {edit ? (
                      <select
                        className='ml-auto text-gray-900 text-right'
                        onChange={(e) =>
                          setAdObj((prevAd) => ({
                            ...prevAd,
                            year: e.target.value,
                          }))
                        }
                        value={adObj.year}
                      >
                        {getYearArr().map((year, index) => (
                          <option key={index} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className='ml-auto text-gray-900'>
                        {adObj.year}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex gap-x-16 mb-3'>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Engine Capacity</span>
                    {edit ? (
                      <>
                        <input
                          type='number'
                          min='100'
                          max='9999'
                          className='ml-auto text-gray-900 text-right'
                          value={adObj.engine_capacity}
                          onChange={(e) =>
                            setAdObj((prevAd) => ({
                              ...prevAd,
                              engine_capacity: e.target.value,
                            }))
                          }
                        />
                        cc
                      </>
                    ) : (
                      <span className='ml-auto text-gray-900'>
                        {adObj.engine_capacity ? (
                          <span>{adObj.engine_capacity} cc</span>
                        ) : (
                          '--'
                        )}
                      </span>
                    )}
                  </div>
                </div>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Color</span>
                    {edit ? (
                      <input
                        type='text'
                        className='ml-auto text-gray-900 text-right'
                        value={adObj.color || ''}
                        onChange={(e) =>
                          setAdObj((prevAd) => ({
                            ...prevAd,
                            color: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <span className='ml-auto text-gray-900'>
                        {adObj.color ? adObj.color : '--'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex gap-x-16 mb-3 '>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Transmission</span>
                    {edit ? (
                      <select
                        className='ml-auto text-gray-900 text-right'
                        onChange={(e) =>
                          setAdObj((prevAd) => ({
                            ...prevAd,
                            transmission: e.target.value,
                          }))
                        }
                        value={adObj.transmission}
                      >
                        <option value='auto'>Auto</option>
                        <option value='manual'>Manual</option>
                      </select>
                    ) : (
                      <span className='ml-auto text-gray-900'>
                        {adObj.transmission}
                      </span>
                    )}
                  </div>
                </div>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Condition</span>
                    {edit ? (
                      <select
                        className='ml-auto text-gray-900 text-right'
                        onChange={(e) =>
                          setAdObj((prevAd) => ({
                            ...prevAd,
                            condition: e.target.value,
                          }))
                        }
                        value={adObj.condition}
                      >
                        <option value='used'>Used</option>
                        <option value='new'>New</option>
                      </select>
                    ) : (
                      <span className='ml-auto text-gray-900'>
                        {adObj.condition}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex gap-x-16 mb-3'>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Registration City</span>
                    {edit ? (
                      <input
                        type='text'
                        className='ml-auto text-gray-900 text-right'
                        value={adObj.registration_city}
                        onChange={(e) =>
                          setAdObj((prevAd) => ({
                            ...prevAd,
                            registration_city: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <span className='ml-auto text-gray-900'>
                        {adObj.registration_city}
                      </span>
                    )}
                  </div>
                </div>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Hybrid</span>
                    {edit ? (
                      <select
                        className='ml-auto text-gray-900 text-right'
                        onChange={(e) =>
                          setAdObj((prevAd) => ({
                            ...prevAd,
                            hybrid: e.target.value,
                          }))
                        }
                        value={adObj.hybrid || 'full'}
                      >
                        <option value='full'>Full</option>
                        <option value='mild'>Mild</option>
                        <option value='plugin'>Plug-in</option>
                      </select>
                    ) : (
                      <span className='ml-auto text-gray-900'>
                        {adObj.hybrid ? adObj.hybrid : '--'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex gap-x-16'>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Fuel</span>
                    {edit ? (
                      <select
                        className='ml-auto text-gray-900 text-right'
                        onChange={(e) =>
                          setAdObj((prevAd) => ({
                            ...prevAd,
                            fuel: e.target.value,
                          }))
                        }
                        value={adObj.fuel || 'petrol'}
                      >
                        <option value='petrol'>Petrol</option>
                        <option value='diesel'>Diesel</option>
                        <option value='cng'>CNG</option>
                        <option value='bio_diesel'>Bio Diesel</option>
                        <option value='lpg'>LPG</option>
                      </select>
                    ) : (
                      <span className='ml-auto text-gray-900'>
                        {adObj.fuel ? adObj.fuel : '--'}
                      </span>
                    )}
                  </div>
                </div>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Distance Covered (km)</span>
                    {edit ? (
                      <input
                        type='number'
                        min='0'
                        className='ml-auto text-gray-900 text-right'
                        value={adObj.distance_covered}
                        onChange={(e) =>
                          setAdObj((prevAd) => ({
                            ...prevAd,
                            distance_covered: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <span className='ml-auto text-gray-900'>
                        {adObj.distance_covered ? adObj.distance_covered : '0'}
                      </span>
                    )}
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

export default EditAdScreen;
