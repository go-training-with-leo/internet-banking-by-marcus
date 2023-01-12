import PropTypes from 'prop-types';
import React from 'react';

import { NotifyBusy, NotifyRemove, NotifyFree } from 'assets/images';

import './style.scss';

const notifycation = {
  busy: <NotifyBusy className='notif-busy' width={40} height={40} />,
  remove: <NotifyRemove className='notif-remove' width={40} height={40} />,
  free: <NotifyFree className='notif-free' width={40} height={40} />,
};

const Header = ({ type, title, children }) => {
  return (
    <div className='header'>
      <div className='header-left'>
        <span>{title}</span>
        {children}
      </div>
      {notifycation[type]}
    </div>
  );
};

Header.defaultProps = {
  type: '',
  title: undefined,
  children: undefined,
};

Header.propsTypes = {
  type: PropTypes.oneOf(['free', 'busy', 'remove']),
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Header;
