import React from 'react';
import PropTypes from 'prop-types';

import { NotifyBusy, NotifyRemove, NotifyFree } from 'assets/images';

import './style.scss';

const Header = ({ notifyBusy, notifyFree, notifyRemove, title, children }) => {
  return (
    <div className='header'>
      <div className='header-left'>
        <span>{title}</span>
        {children}
      </div>
      {notifyBusy ? (
        <NotifyBusy className='notif-busy' width={40} height={40} />
      ) : notifyRemove ? (
        <NotifyRemove className='notif-remove' width={40} height={40} />
      ) : (
        notifyFree && (
          <NotifyFree className='notif-free' width={40} height={40} />
        )
      )}
    </div>
  );
};

Header.defaultProps = {
  notifyBusy: false,
  notifyFree: false,
  notifyRemove: false,
  title: undefined,
  children: undefined,
};

Header.propsTypes = {
  notifyBusy: PropTypes.bool,
  notifyFree: PropTypes.bool,
  notifyRemove: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Header;
