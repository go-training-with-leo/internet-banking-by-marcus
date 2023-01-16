import DefaultButton from 'components/Button/Default';
import React from 'react';

import './style.scss';

const Account = () => {
  return (
    <div className='account-view'>
      <div className='account-view-row'>
        <span className='title'>Name:</span>
        <span>Justin Doe</span>
      </div>
      <div className='account-view-row'>
        <span className='title'>Phone:</span>
        <span>+84381234567</span>
      </div>
      <div className='account-view-row'>
        <span className='title'>Email:</span>
        <span>email@gmail.com</span>
      </div>
      <div className='account-view-btn'>
        <DefaultButton danger>Change password</DefaultButton>
      </div>
      <div className='account-view-btn'>
        <DefaultButton danger>Log out</DefaultButton>
      </div>
    </div>
  );
};

export default Account;
