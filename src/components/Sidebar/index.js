import React from 'react';
import PropTypes from 'prop-types';

import { EightLogo } from 'assets/images';

import 'components/Sidebar/style.scss';

const Sidebar = ({ children, bottomItem }) => {
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

Sidebar.defaultProps = {
  children: undefined,
  bottomItem: undefined,
};

Sidebar.propTypes = {
  children: PropTypes.node,
  bottomItem: PropTypes.node,
};

export default Sidebar;
