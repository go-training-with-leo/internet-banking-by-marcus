import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Menu, Translate } from 'assets/images';

import './style.scss';

const Header = ({ title, children, onMenuClick }) => {
  const { i18n } = useTranslation();

  const switchLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en');
  };
  return (
    <div className='header'>
      <div className='header-left'>
        <Menu
          width={50}
          height={50}
          className='mobile-menu'
          fill='white'
          onClick={onMenuClick}
        />
        <span>{title}</span>
        {children}
      </div>
      <div className='notif'>
        <Translate
          className='translate'
          width={30}
          height={30}
          fill='white'
          onClick={switchLang}
        />
        <span className='lang'>{i18n.language}</span>
      </div>
    </div>
  );
};

Header.defaultProps = {
  title: undefined,
  children: undefined,
};

Header.propsTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Header;
