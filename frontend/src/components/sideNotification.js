import React from 'react';

const SideNotification = ({ msg, isSuccess }) => {
  return (
    <div
      class={`fixed top-30 right-0 border ${
        isSuccess
          ? 'bg-green-100 border-green-400 text-green-700'
          : 'bg-red-100 border-red-400 text-red-700'
      }  px-4 py-3 rounded-tl rounded-bl`}
      role='alert'
    >
      <strong class='font-bold mr-1'>
        {isSuccess ? 'Success' : 'Danger'}:
      </strong>
      <span class='block sm:inline'>{msg}</span>
    </div>

    // <div
    //   className={`fixed top-30 right-0 py-3 px-5  text-sm text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800 ${
    //     isSuccess &&
    //     'text-green-700 bg-green-100  dark:bg-green-200 dark:text-green-800'
    //   } rounded-tl-lg rounded-bl-lg`}
    //   role='alert'
    // >
    //   {msg}
    // </div>
  );
};

export default SideNotification;
