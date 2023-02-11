import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Loader from 'components/Loader';
import { CreditCard, EightLogo, MasterCard, Napas, Visa } from 'assets/images';
import { parseMoneyVnd } from 'utils/helpers';

import './style.scss';

const Card = ({
  idCard,
  isLoading,
  isActive,
  isCompleted,
  children,
  visaCard,
  masterCard,
  napasCard,
  expireTime,
  onClick,
  depositClick,
}) => {
  return (
    <div
      className={classNames('card-container', {
        'napas-card': napasCard,
        'visa-card': visaCard,
        'master-card': masterCard,
        isCompleted: isCompleted,
        isActive: isActive,
        loading: isLoading,
        isHover: depositClick,
      })}
    >
      <div
        className={classNames('card', { loading: isLoading })}
        role='button'
        tabIndex={0}
        onClick={onClick}
      >
        {isLoading ? (
          <Loader fill='red' />
        ) : (
          <>
            <div className='top-line'>
              <EightLogo />
              <div
                className={classNames('icon-btn')}
                role='button'
                tabIndex={0}
                onClick={depositClick}
              >
                <CreditCard width={30} height={30} fill='white' />
              </div>
            </div>
            <span className='card-money'>{parseMoneyVnd(children)} VND</span>
            <div className='card-info'>
              <div className='info'>
                <span className='info-id'>{idCard}</span>
                <span className='info-expire'>{expireTime}</span>
              </div>
              {masterCard ? (
                <MasterCard data-testid='master-card' />
              ) : visaCard ? (
                <Visa data-testid='visa-card' fill='white' />
              ) : (
                napasCard && <Napas data-testid='napas-card' />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Card.defaultProps = {
  idCard: undefined,
  children: undefined,
  visaCard: false,
  masterCard: false,
  napasCard: false,
  onClick: undefined,
  isLoading: false,
  expireTime: undefined,
  depositClick: undefined,
};

Card.propTypes = {
  idCard: PropTypes.string,
  children: PropTypes.string,
  expireTime: PropTypes.string,
  visaCard: PropTypes.bool,
  masterCard: PropTypes.bool,
  napasCard: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  depositClick: PropTypes.func,
};

export default Card;
