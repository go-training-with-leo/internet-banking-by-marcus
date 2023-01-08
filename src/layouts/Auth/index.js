import React, { memo } from 'react';

import { EightGif, EightLogo } from 'assets/images';
import { Outlet } from 'react-router-dom';

import './style.scss';

const AuthLayout = () => {
  return (
    <div className='auth-page'>
      <div className='auth-logo'>
        <img src={EightGif} alt='Gif logo' width={146} />
        <EightLogo width={200} height={45} />
        <span>an internet banking service by Team Eight</span>
      </div>
      <div className='auth-form'>
        <Outlet />
      </div>
    </div>
  );
};

export default memo(AuthLayout);
