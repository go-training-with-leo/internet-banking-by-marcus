import React, { memo } from 'react';

import { EightGif, EightLogo, Translate } from 'assets/images';

import './style.scss';
import { useTranslation } from 'react-i18next';

const AuthLayout = ({ children }) => {
  const { i18n } = useTranslation();
  return (
    <div className='auth-page'>
      <Translate
        className='translate'
        width={30}
        height={30}
        fill='white'
        onClick={() =>
          i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en')
        }
      />
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
