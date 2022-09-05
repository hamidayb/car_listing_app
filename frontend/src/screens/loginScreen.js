import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import Error from '../components/error';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUserState = useSelector((state) => state.userLogin);
  const { userInfo, error } = loginUserState;
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <section>
      <div className='px-6 text-gray-800'>
        <div className='container align-middle p-5 pt-2 sm:p-5 mx-auto flex'>
          <div className='w-full lg:w-1/3 md:w-1/2 mx-auto bg-white rounded-lg p-8 flex flex-col mt-10 sm:mt-0 relative z-10 shadow-xl'>
            <h2 className='text-gray-900 text-center text-xl mb-1 font-bold title-font'>
              LOGIN
            </h2>
            <p className='leading-relaxed text-center mb-5 text-gray-600 text-sm'>
              Get the best cars in cheap rates
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                />
              </div>
              <div className='relative mb-4'>
                <label
                  htmlFor='password'
                  className='leading-7 text-sm text-gray-600'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                />
              </div>
              {error && <Error errorMsg={error} />}
              <button
                className='w-full text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
                onClick={submitHandler}
              >
                Submit
              </button>
            </form>
            <p className='text-sm text-gray-500 mt-6'>
              Don't have an account? &nbsp;
              <Link to='/register' className='text-indigo-500'>
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginScreen;
