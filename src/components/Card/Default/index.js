import React from 'react';

import PropTypes from 'prop-types';

import './style.scss';
import { EightLogo, MasterCard, Napas, Visa } from 'assets/images';
import classNames from 'classnames';
import { preProcessMoney } from 'utils/helpers';

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
  console.warn(preProcessMoney(children));
  return (
    <div
      className={classNames('card-container', {
        'master-card': masterCard,
        'visa-card': visaCard,
        'napas-card': napasCard,
      })}
    >
      {isLoading && (
        <div className='card' role='button' tabIndex={0} onClick={onClick}>
          <EightLogo />
          <span className='card-money'>{preProcessMoney(children)} VND</span>
          <div className='card-info'>
            <div className='info'>
              <span className='info-id'>{idCard}</span>
              <span className='info-expire'>{expireTime}</span>
            </div>
            {masterCard ? (
              <MasterCard />
            ) : visaCard ? (
              <Visa fill='white' />
            ) : (
              napasCard && <Napas />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Card.defaultProps = {
  visaCard: false,
  masterCard: false,
  napasCard: false,
  onClick: undefined,
  isLoading: false,
  expireTime: undefined,
};

Card.propTypes = {
  idCard: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  expireTime: PropTypes.string,
  visaCard: PropTypes.bool,
  masterCard: PropTypes.bool,
  napasCard: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;
