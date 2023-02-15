import React, { memo } from 'react';

import { EightGif, EightLogo } from 'assets/images';

import './style.scss';

const AuthLayout = ({ children }) => {
  return (
    <div className='auth-page'>
      <div className='auth-logo'>
        <img src={EightGif} alt='Gif logo' width={146} />
        <EightLogo width={200} height={45} />
        <span>an internet banking service by Team Eight</span>
      </div>
      <div className='auth-form'>{children}</div>
    </div>
  );
};

export default memo(AuthLayout);
