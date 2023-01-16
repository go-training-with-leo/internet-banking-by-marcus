import React from 'react';

import './style.scss';

const Success = () => {
  return (
    <form className='empl-modal'>
      <span>
        An account has successfully been created! The account’s details is
        below.
      </span>
      <span>Sign-in information</span>
      <div className='tab-info'>
        <div className='tab-info-row'>
          <span className='title'>Email:</span>
          <span>email@gmail.com</span>
        </div>
        <div className='tab-info-row'>
          <span className='title'>Password:</span>
          <span>A2A?\QhLKT_dTj</span>
        </div>
      </div>
      <span>Personal information</span>
      <div className='tab-info'>
        <div className='tab-info-row'>
          <span className='title'>Name:</span>
          <span>email@gmail.com</span>
        </div>
        <div className='tab-info-row'>
          <span className='title'>Phone:</span>
          <span>+84 381234567</span>
        </div>
      </div>
    </form>
  );
};

export default Success;
