import React from 'react';
import PropTypes from 'prop-types';

import { CreditCardDone, NotifyRemove } from 'assets/images';

import './style.scss';

const Notification = ({ messages }) => {
  return (
    <div className='notification'>
      {messages ? (
        messages?.map((message) => (
          <div className='notification-item' key={message?.id}>
            {message?.type === 'removed' ? (
              <NotifyRemove width={60} height={60} />
            ) : (
              message?.type === 'repaid' && (
                <CreditCardDone width={60} height={60} />
              )
            )}
            <div className='time-detail'>
              <span>{message?.content}</span>
              <span>{message?.time}</span>
            </div>
          </div>
        ))
      ) : (
        <span>No notification</span>
      )}
    </div>
  );
};

Notification.defaultProps = {
  messages: null,
};

Notification.propTypes = {
  messages: PropTypes.object,
};

export default Notification;
