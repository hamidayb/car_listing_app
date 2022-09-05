import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <header className='text-gray-600 body-font bg-white '>
      <div className='container mx-auto flex flex-wrap p-5 flex-row items-center'>
        <Link
          to='/'
          className='flex title-font font-medium items-center text-gray-900 mb-0'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            className='w-10 h-10 text-white p-2 bg-indigo-500 rounded-full'
            viewBox='0 0 24 24'
          >
            <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
          </svg>
          <span className='ml-3 text-xl hidden sm:inline'>Tailblocks</span>
        </Link>
        <nav className='mr-auto ml-4 py-1 pl-4 border-l border-gray-400	flex flex-wrap items-center text-base justify-center'>
          <Link to='/' className='mr-6 hover:text-gray-900'>
            Home
          </Link>
          {userInfo && (
            <>
              <Link to='/my' className='mr-6 hover:text-gray-900'>
                My Ads
              </Link>
              <Link to='/' className='mr-6 hover:text-gray-900'>
                My Profile
              </Link>
            </>
          )}
        </nav>
        {userInfo ? (
          <span>Hi! {userInfo.user.name}</span>
        ) : (
          <Link
            to='login/'
            className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-0'
          >
            Login
          </Link>
        )}
        <button onClick={logoutHandler} className='pl-2'>
          <FontAwesomeIcon icon={faPowerOff} />
        </button>
      </div>
    </header>
  );
};

export default Header;
