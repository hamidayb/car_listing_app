import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import {
  faLocationDot,
  faMoneyBill1,
  faEdit,
  faEye,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { roundOfPrice } from '../utils';
import { deleteAd } from '../redux/actions/adActions';

const AdCard = ({ ad }) => {
  const [searchParams] = useSearchParams();
  const edit = searchParams.get('edit') || false;
  const dummyimage = 'https://dummyimage.com/720x400';

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteAd(ad.slug));
  };

  return (
    <div className='p-4 md:w-1/3'>
      <div className='h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden'>
        <img
          className='lg:h-48 md:h-36 w-full object-cover object-center'
          src={ad.image ? `http://localhost:8000${ad.image}` : dummyimage}
          alt='blog'
        />
        <div className='p-6'>
          <div className='flex items-center flex-wrap '>
            <h2 className='capitalize tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
              {ad.type}
            </h2>
            <h2 className='capitalize ml-auto tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
              <FontAwesomeIcon icon={faLocationDot} />
              &nbsp;
              {ad.registration_city}
            </h2>
          </div>
          <h1 className='title-font text-lg font-medium text-gray-900 mb-3'>
            {ad.make.concat(' ', ad.model, ' (', ad.year, ')')}
          </h1>
          <p className='leading-relaxed mb-3'>{ad.description}</p>
          <div className='flex items-center flex-wrap'>
            <FontAwesomeIcon icon={faMoneyBill1} /> &nbsp;
            <span
              className='font-medium text-gray-600'
              style={{ paddingLeft: '2px' }}
            >
              PKR
            </span>
            <span
              className='text-gray-800 font-bold'
              style={{ paddingLeft: '2px' }}
            >
              {roundOfPrice(ad.price)} LAC
            </span>
            <div className='inline-flex items-center items-center lg:ml-auto md:ml-0 ml-auto leading-none '>
              {edit ? (
                <>
                  <Link
                    to={'/' + ad.slug}
                    className='text-indigo-500 inline-flex items-center items-center  leading-none  py-1 pr-1 border-r border-gray-400'
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                  <Link
                    to={ad.slug + '/edit'}
                    className='text-indigo-500 inline-flex items-center items-center   py-1 px-1 border-r border-gray-400'
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <button
                    to={'/' + ad.slug}
                    onClick={handleDelete}
                    className='text-indigo-500 inline-flex items-center items-center  leading-none  py-1 pl-1'
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>
              ) : (
                <Link
                  to={'/' + ad.slug}
                  className='text-indigo-500 inline-flex items-center items-center lg:ml-auto md:ml-0 ml-auto leading-none  py-1 pl-1'
                >
                  View Details
                  <svg
                    className='w-4 h-4 ml-2'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M5 12h14'></path>
                    <path d='M12 5l7 7-7 7'></path>
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
