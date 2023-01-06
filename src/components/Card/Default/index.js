import React from 'react';

import PropTypes from 'prop-types';

import './style.scss';
import { EightLogo, MasterCard, Napas, Visa } from 'assets/images';
import classNames from 'classnames';
import { parseMoneyVnd } from 'utils/helpers';
import Loader from 'components/Loader';

const Card = ({
  idCard,
  isLoading,
  children,
  visaCard,
  masterCard,
  napasCard,
  expireTime,
  onClick,
}) => {
  return (
    <div
      className={classNames('card-container', {
        'napas-card': napasCard,
        'visa-card': visaCard,
        'master-card': masterCard,
        loading: isLoading,
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
            <EightLogo />
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
};

export default Card;
