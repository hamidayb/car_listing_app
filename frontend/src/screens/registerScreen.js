import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/actions/userActions';
import Error from '../components/error';
import { REGISTER_USER_RESET } from '../redux/constants/userConstants';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerUserState = useSelector((state) => state.userRegister);
  const { success, error } = registerUserState;

  useEffect(() => {
    if (success) {
      dispatch({ type: REGISTER_USER_RESET });
      navigate('/login');
    }
  }, [success, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      gender,
      city,
      password,
    };
    console.log(user);
    dispatch(registerUser(user));
  };

  return (
    <section>
      <div className='px-6 text-gray-800'>
        <div className='container align-middle p-5 pt-2 sm:p-5 mx-auto flex'>
          <div className='w-full lg:w-1/3 md:w-1/2 mx-auto bg-white rounded-lg p-8 flex flex-col mt-10 sm:mt-0 relative z-10 shadow-xl'>
            <h2 className='uppercase text-gray-900 text-center text-xl mb-1 font-bold title-font'>
              register
            </h2>
            <p className='leading-relaxed text-center mb-5 text-gray-600 text-sm'>
              Hurry up! Get the best cars in cheap rates
            </p>
            <form method='POST'>
              <div className='relative mb-4'>
                <label
                  htmlFor='email'
                  className='leading-7 text-sm text-gray-600'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  required
                />
              </div>
              {error && error.email && <Error errorMsg={error.email[0]} />}

              <div className='relative mb-4'>
                <label
                  htmlFor='name'
                  className='leading-7 text-sm text-gray-600'
                >
                  Full Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  onChange={(e) => setName(e.target.value)}
                  className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  required
                />
              </div>
              {error && error.name && <Error errorMsg={error.name[0]} />}

              <div className='relative mb-4'>
                <label
                  htmlFor='gender'
                  className='leading-7 text-sm text-gray-600'
                >
                  Gender
                </label>
                <select
                  id='gender'
                  name='gender'
                  onChange={(e) => setGender(e.target.value)}
                  className=' w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out'
                >
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div>
              <div className='relative mb-4'>
                <label
                  htmlFor='city'
                  className='leading-7 text-sm text-gray-600'
                >
                  City
                </label>
                <input
                  type='text'
                  id='city'
                  name='city'
                  onChange={(e) => setCity(e.target.value)}
                  className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  required
                />
              </div>
              {error && error.city && <Error errorMsg={error.city[0]} />}

              <div className='relative mb-4'>
                <label
                  htmlFor='passowrd'
                  className='leading-7 text-sm text-gray-600'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  required
                />
              </div>
              {error &&
                error.password &&
                error.password.map((err, index) => (
                  <Error key={index} errorMsg={<>{error.password[index]}</>} />
                ))}
              <button
                onClick={submitHandler}
                className='w-full text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
              >
                Submit
              </button>
            </form>
            <p className='text-sm text-gray-500 mt-6'>
              Already have an account? &nbsp;
              <Link to='/login' className='text-indigo-500'>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterScreen;
