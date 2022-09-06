import React from 'react';

const SuccessDialog = ({ successMsg }) => {
  return (
    <div
      className='p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800'
      role='alert'
    >
      {successMsg}
    </div>
  );
};

export default SuccessDialog;
