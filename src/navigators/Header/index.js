import PropTypes from 'prop-types';
import React from 'react';

import { NotifyBusy, NotifyRemove, NotifyFree, Menu } from 'assets/images';

import Notification from 'components/Notification';
import useToggle from 'components/hooks/useToggle';

import './style.scss';

const messages = [
  {
    id: 'MSG1',
    account: {
      type: 'lender',
      name: 'Jusin Doe',
      last4Digit: '4968',
    },
    type: 'removed',
    time: '09:51:36 23/05/2020',
  },
  {
    id: 'MSG2',
    account: {
      type: 'debtor',
      name: 'Jusin Doe',
      last4Digit: '4968',
    },
    type: 'repaid',
    time: '09:51:36 23/05/2020',
  },
  {
    id: 'MSG3',
    account: {
      type: 'lender',
      name: 'Jusin Doe',
      last4Digit: '4968',
    },
    type: 'removed',
    time: '09:51:36 23/05/2020',
  },
  {
    id: 'MSG4',
    account: {
      type: 'lender',
      name: 'Jusin Doe',
      last4Digit: '4968',
    },
    type: 'removed',
    time: '09:51:36 23/05/2020',
  },
  {
    id: 'MSG5',
    account: {
      type: 'lender',
      name: 'Jusin Doe',
      last4Digit: '4968',
    },
    type: 'removed',
    time: '09:51:36 23/05/2020',
  },
  {
    id: 'MSG6',
    account: {
      type: 'lender',
      name: 'Jusin Doe',
      last4Digit: '4968',
    },
    type: 'removed',
    time: '09:51:36 23/05/2020',
  },
  {
    id: 'MSG7',
    account: {
      type: 'lender',
      name: 'Jusin Doe',
      last4Digit: '4968',
    },
    type: 'removed',
    time: '09:51:36 23/05/2020',
  },
];

const Header = ({ type, title, children, onMenuClick }) => {
  const [showNotif, setShowNotif] = useToggle();

  const notifycation = {
    busy: (
      <NotifyBusy
        className='notif-busy'
        width={40}
        height={40}
        onClick={setShowNotif}
      />
    ),
    remove: (
      <NotifyRemove
        className='notif-remove'
        width={40}
        height={40}
        onClick={setShowNotif}
      />
    ),
    free: (
      <NotifyFree
        className='notif-free'
        width={40}
        height={40}
        onClick={setShowNotif}
      />
    ),
  };
  return (
    <div className='header'>
      <div className='header-left'>
        <Menu className='mobile-menu' fill='white' onClick={onMenuClick} />
        <span>{title}</span>
        {children}
      </div>
      <div className='notif hide'>
        {notifycation[type]}
        {showNotif && <Notification messages={messages} />}
      </div>
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
