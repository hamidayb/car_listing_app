import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Error from '../components/error';
import { postAd } from '../redux/actions/adActions';
import { getYearArr, getErrorsAsStr } from '../utils';
import { POST_AD_RESET } from '../redux/constants/adConstants';
import SideNotification from '../components/sideNotification';

const CreateAdScreen = () => {
  const initialState = {
    model: '',
    make: '',
    type: '',
    year: 2022,
    engineCapacity: 0,
    color: '',
    transmission: 'auto',
    condition: 'used',
    regCity: '',
    hybrid: 'full',
    fuel: 'petrol',
    distanceCovered: 0,
    price: 0,
  };

  const [adObj, setAdObj] = useState(initialState);
  const [image, setImage] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [formError, setFormError] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, error } = useSelector((state) => state.postAd);

  useEffect(() => {
    if (success) {
      setAdObj(initialState);
      setImage();
      setTimeout(() => {
        dispatch({ type: POST_AD_RESET });
        navigate('/my');
      }, 1000);
    }
  }, [success, dispatch]);

  const onImgChangeHandler = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    setImage(file);

    reader.onloadend = function (e) {
      setImgSrc([reader.result]);
      console.log(url);
    };
  };

  const submitHandler = () => {
    let form_data = new FormData();
    if (image) {
      form_data.append('model', adObj.model);
      form_data.append('make', adObj.make);
      form_data.append('type', adObj.type);
      form_data.append('year', adObj.year);
      form_data.append('engine_capacity', adObj.engineCapacity);
      form_data.append('color', adObj.color);
      form_data.append('transmission', adObj.transmission);
      form_data.append('condition', adObj.condition);
      form_data.append('registration_city', adObj.regCity);
      form_data.append('hybrid', adObj.hybrid);
      form_data.append('fuel', adObj.fuel);
      form_data.append('distance_covered', adObj.distanceCovered);
      form_data.append('price', adObj.price);
      form_data.append('image', image, image.name);
      dispatch(postAd(form_data));
    } else {
      setFormError('Image is required!');
      setTimeout(() => {
        setFormError();
      }, 3000);
    }
  };

  return (
    <section className='text-gray-600 body-font'>
      {success && (
        <SideNotification msg='Created Successfully' isSuccess={true} />
      )}
      {formError && <SideNotification msg={formError} isSuccess={false} />}
      <div className='container px-5 py-5 mx-auto flex flex-col'>
        {
          <div className='lg:w-4/6 mx-auto'>
            <h1 className='text-center text-2xl font-bold'>Your Car Details</h1>
            <p className='text-center text-sm '>
              Get instant offers for your car now
            </p>
            <h1 className='mt-5 text-gray-900 text-3xl title-font font-medium mb-1'>
              {adObj.model &&
                adObj.make.concat(' ', adObj.model, ' (', adObj.year, ')')}
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
                      value={adObj.engineCapacity}
                      onChange={(e) =>
                        setAdObj((prevAdObj) => ({
                          ...prevAdObj,
                          engineCapacity: e.target.value,
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
                    value={adObj.color}
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
                    value={adObj.transmission}
                    onChange={(e) =>
                      setAdObj((prevAdObj) => ({
                        ...prevAdObj,
                        transmission: e.target.value,
                      }))
                    }
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
                    value={adObj.condition}
                    onChange={(e) =>
                      setAdObj((prevAdObj) => ({
                        ...prevAdObj,
                        color: e.target.value,
                      }))
                    }
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
                    value={adObj.regCity}
                    onChange={(e) =>
                      setAdObj((prevAdObj) => ({
                        ...prevAdObj,
                        regCity: e.target.value,
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
                    value={adObj.hybrid}
                    onChange={(e) =>
                      setAdObj((prevAdObj) => ({
                        ...prevAdObj,
                        hybrid: e.target.value,
                      }))
                    }
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
                    value={adObj.fuel}
                    onChange={(e) =>
                      setAdObj((prevAdObj) => ({
                        ...prevAdObj,
                        fuel: e.target.value,
                      }))
                    }
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
                    value={adObj.distanceCovered}
                    onChange={(e) =>
                      setAdObj((prevAdObj) => ({
                        ...prevAdObj,
                        distanceCovered: e.target.value,
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
            <div className='rounded mt-5 ml-2'>
              <input
                type='file'
                id='image'
                accept='image/png, image/jpeg, image/webp, image/jpg'
                onChange={onImgChangeHandler}
              />
            </div>
            {imgSrc && (
              <div className='flex mt-5'>
                <img
                  alt='content'
                  className='object-cover object-center h-full w-full'
                  src={imgSrc}
                />
              </div>
            )}

            <div className='flex mt-5'>
              {error && (
                <Error
                  errorMsg={getErrorsAsStr(error)}
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
        }
      </div>
    </section>
  );
};

export default CreateAdScreen;
