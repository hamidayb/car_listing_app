import React from 'react';

const Error = ({ errorMsg, classes }) => {
  return (
    <div
      className={`mx-auto p-4 mb-1 mt-1 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 ${
        classes && classes
      }`}
      role='alert'
    >
      {errorMsg}
    </div>
  );
};

export default Error;
