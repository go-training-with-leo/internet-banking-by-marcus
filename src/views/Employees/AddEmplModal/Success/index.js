import PropTypes from 'prop-types';
import React from 'react';

import DefaultButton from 'components/Button/Default';
import { useSelector } from 'react-redux';
import { selectAccount } from 'core/selectors';

import './style.scss';

const Success = ({ setToggle }) => {
  const {
    newAccount: { email, accountName, phoneNumber },
  } = useSelector(selectAccount);

  return (
    <form className='empl-modal'>
      <span>
        An account has successfully been created! The account’s details is
        below.
      </span>
      <span>Sign-in information</span>
      <div className='tab-info'>
        <div className='tab-info-row'>
          <span className='title'>Email:</span>
          <span>{email}</span>
        </div>
        <div className='tab-info-row'>
          <span className='title'>Password:</span>
          <span>A2A?\QhLKT_dTj</span>
        </div>
      </div>
      <span>Personal information</span>
      <div className='tab-info'>
        <div className='tab-info-row'>
          <span className='title'>Name:</span>
          <span>{accountName}</span>
        </div>
        <div className='tab-info-row'>
          <span className='title'>Phone:</span>
          <span>{phoneNumber}</span>
        </div>
      </div>
      <DefaultButton danger onClick={setToggle}>
        OK
      </DefaultButton>
    </form>
  );
};

Success.defaultProps = {
  setToggle: () => {},
};

Success.propTypes = {
  setToggle: PropTypes.func,
};

export default Success;
