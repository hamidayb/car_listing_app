import React from 'react';

const SideNotification = ({ msg, isSuccess }) => {
  return (
    <div
      className={`fixed top-30 right-0 py-3 px-5  text-sm text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800 ${
        isSuccess &&
        'text-green-700 bg-green-100  dark:bg-green-200 dark:text-green-800'
      } rounded-tl-lg rounded-bl-lg`}
      role='alert'
    >
      {msg}
    </div>
  );
};

export default SideNotification;
