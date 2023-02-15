import PropTypes from 'prop-types';
import React from 'react';

import { Menu } from 'assets/images';

import './style.scss';

const Header = ({ title, children, onMenuClick }) => {
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
