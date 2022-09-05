import React from 'react';

const Error = ({ errorMsg }) => {
  return (
    <div
      className='mx-auto p-4 mb-4 mt-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
      role='alert'
    >
      <span className='font-medium mr-3'>
        <i className='fa-sharp fa-solid fa-circle-exclamation'></i>
      </span>
      {errorMsg}
    </div>
  );
};

export default Error;
