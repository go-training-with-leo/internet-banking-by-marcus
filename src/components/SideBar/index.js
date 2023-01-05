import React from 'react';
import PropTypes from 'prop-types';

import { EightLogo } from 'assets/images';

import './style.scss';

const SideBar = ({ children, bottomItem }) => {
  return (
    <div className='side-bar'>
      <div className='side-bar__top'>
        <EightLogo className='logo' />
        <div className='list-item'>{children}</div>
      </div>
      {bottomItem}
    </div>
  );
};

SideBar.defaultProps = {
  children: undefined,
  bottomItem: undefined,
};

SideBar.propTypes = {
  children: PropTypes.node,
  bottomItem: PropTypes.node,
};

export default SideBar;
