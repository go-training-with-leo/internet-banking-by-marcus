import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { CreditCardDone, NotifyRemove } from 'assets/images';

import './style.scss';

const Notification = ({ messages }) => {
  return (
    <div className='notification'>
      {messages ? (
        messages?.map((message) => (
          <div className='notification-item' key={message?.id}>
            {message?.type === 'removed' ? (
              <NotifyRemove
                width={60}
                height={60}
                fill={
                  message?.account?.type === 'lender'
                    ? '#27AE60'
                    : message?.account?.type === 'debtor' && '#EF230C'
                }
              />
            ) : (
              message?.type === 'repaid' && (
                <CreditCardDone
                  width={50}
                  height={50}
                  fill={
                    message?.account?.type === 'lender'
                      ? '#27AE60'
                      : message?.account?.type === 'debtor' && '#EF230C'
                  }
                />
              )
            )}
            <div className='content'>
              <span>
                Your{' '}
                <span
                  className={classNames({
                    [message?.account?.type]: message?.account?.type,
                  })}
                >
                  {message?.account?.type}
                </span>{' '}
                ({message?.account?.name}/ {message?.account?.last4Digit}) has{' '}
                {message?.type} a debt{' '}
                {message?.type === 'removed' ? 'reminder of ' : 'to '}
                you
              </span>
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
  messages: PropTypes.array,
};

export default Notification;
