import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../components/loader';
import Error from '../components/error';
import { getAd, updateAd } from '../redux/actions/adActions';
import { getYearArr, getErrorsAsStr } from '../utils';
import SuccessDialog from '../components/success';
import { UPDATE_AD_RESET } from '../redux/constants/adConstants';

const EditAdScreen = () => {
  const [adObj, setAdObj] = useState(null);
  const [image, setImage] = useState(null);
  const { slug } = useParams();

  const dispatch = useDispatch();

  const { loading, adInfo, error } = useSelector((state) => state.ad);

  const { success, error: updateAdError } = useSelector(
    (state) => state.updateAd
  );

  useEffect(() => {
    dispatch(getAd(slug));
    if (success) {
      setTimeout(() => {
        dispatch({ type: UPDATE_AD_RESET });
      }, 3000);
    }
  }, [dispatch, success, slug]);

  useEffect(() => {
    if (adInfo && !adObj) {
      setAdObj(adInfo);
    }
  }, [adInfo, adObj]);

  const submitHandler = (e) => {
    e.preventDefault();

    let form_data = new FormData();
    if (adObj) {
      form_data.append('model', adObj.model);
      form_data.append('make', adObj.make);
      form_data.append('type', adObj.type);
      form_data.append('year', adObj.year);
      form_data.append('engine_capacity', adObj.engine_capacity);
      form_data.append('color', adObj.color);
      form_data.append('transmission', adObj.transmission);
      form_data.append('condition', adObj.condition);
      form_data.append('registration_city', adObj.registration_city);
      form_data.append('hybrid', adObj.hybrid);
      form_data.append('fuel', adObj.fuel);
      form_data.append('distance_covered', adObj.distance_covered);
      form_data.append('price', adObj.price);
      if (image) form_data.append('image', image, image.name);
      dispatch(updateAd(form_data, slug));
    }
    // }
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
                  src={`http://localhost:8000${adInfo.image}`}
                />
                <input
                  type='file'
                  id='image'
                  accept='image/png, image/jpeg, image/webp, image/jpg'
                  onChange={(e) => setImage(e.target.files[0])}
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
                    <input
                      type='text'
                      className='ml-auto text-gray-900 text-right'
                      value={adObj.model}
                      onChange={(e) =>
                        setAdObj((prevAdObj) => ({
                          ...prevAdObj,
                          model: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Make</span>

                    <input
                      type='text'
                      className='ml-auto text-gray-900 text-right'
                      value={adObj.make}
                      onChange={(e) =>
                        setAdObj((prevAdObj) => ({
                          ...prevAdObj,
                          make: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='flex gap-x-16 mb-3'>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Vehicle Type</span>
                    <select
                      className='ml-auto text-gray-900 text-right bg-white'
                      value={adObj.type}
                      onChange={(e) =>
                        setAdObj((prevAdObj) => ({
                          ...prevAdObj,
                          type: e.target.value,
                        }))
                      }
                      required
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

                    <select
                      className='ml-auto text-gray-900 text-right'
                      value={adObj.year}
                      onChange={(e) =>
                        setAdObj((prevAdObj) => ({
                          ...prevAdObj,
                          year: e.target.value,
                        }))
                      }
                      required
                    >
                      {getYearArr().map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className='flex gap-x-16 mb-3'>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Engine Capacity</span>
                    <>
                      <input
                        type='number'
                        min='100'
                        max='9999'
                        className='ml-auto text-gray-900 text-right'
                        value={adObj.engine_capacity}
                        onChange={(e) =>
                          setAdObj((prevAdObj) => ({
                            ...prevAdObj,
                            engine_capacity: e.target.value,
                          }))
                        }
                      />
                      cc
                    </>
                  </div>
                </div>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Color</span>

                    <input
                      type='text'
                      className='ml-auto text-gray-900 text-right'
                      value={adObj.color || ''}
                      onChange={(e) =>
                        setAdObj((prevAdObj) => ({
                          ...prevAdObj,
                          color: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className='flex gap-x-16 mb-3 '>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Transmission</span>

                    <select
                      className='ml-auto text-gray-900 text-right'
                      onChange={(e) =>
                        setAdObj((prevAdObj) => ({
                          ...prevAdObj,
                          transmission: e.target.value,
                        }))
                      }
                      value={adObj.transmission}
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
                      className='ml-auto text-gray-900 text-right'
                      onChange={(e) =>
                        setAdObj((prevAdObj) => ({
                          ...prevAdObj,
                          condition: e.target.value,
                        }))
                      }
                      value={adObj.condition || 'used'}
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

                    <input
                      type='text'
                      className='ml-auto text-gray-900 text-right'
                      value={adObj.registration_city}
                      onChange={(e) =>
                        setAdObj((prevAdObj) => ({
                          ...prevAdObj,
                          registration_city: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Hybrid</span>

                    <select
                      className='ml-auto text-gray-900 text-right'
                      onChange={(e) =>
                        setAdObj((prevAdObj) => ({
                          ...prevAdObj,
                          hybrid: e.target.value,
                        }))
                      }
                      value={adObj.hybrid || 'full'}
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
                      onChange={(e) =>
                        setAdObj((prevAdObj) => ({
                          ...prevAdObj,
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
                  </div>
                </div>
                <div className='w-2/4'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-500'>Distance Covered (km)</span>

                    <input
                      type='number'
                      min='0'
                      className='ml-auto text-gray-900 text-right'
                      value={adObj.distance_covered}
                      onChange={(e) =>
                        setAdObj((prevAdObj) => ({
                          ...prevAdObj,
                          distance_covered: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className='flex mt-3'>
                <div className='w-full'>
                  <div className='flex border-b border-gray-200'>
                    <span className='text-gray-900 text-lg'>Price</span>
                    <input
                      type='text'
                      className='ml-auto text-gray-900 text-right text-lg'
                      value={adObj.price}
                      onChange={(e) =>
                        setAdObj((prevAdObj) => ({
                          ...prevAdObj,
                          price: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className='flex mt-5'>
                {updateAdError && (
                  <Error
                    errorMsg={getErrorsAsStr(updateAdError)}
                    classes={'mx-none w-full'}
                  />
                )}
              </div>
              <div className='flex mt-5'>
                {success && (
                  <SuccessDialog
                    successMsg='Updated Successfully'
                    classes={'mx-none w-full'}
                  />
                )}
              </div>
              <div className='flex mt-5'>
                <button
                  onClick={submitHandler}
                  className='w-full text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
                >
                  Submit
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default EditAdScreen;
