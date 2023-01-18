import PropTypes from 'prop-types';
import React from 'react';

import DefaultButton from 'components/Button/Default';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount } from 'core/selectors';

import './style.scss';
import { resetAccount } from 'global/redux/account/slice';

const Success = ({ setToggle }) => {
  const dispatch = useDispatch();

  const {
    newAccount: {
      email,
      accountName,
      phoneNumber,
      password,
      isLoading: loading,
    },
  } = useSelector(selectAccount);

  const handleFinish = () => {
    dispatch(resetAccount());
    setToggle();
  };

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
          <span>{password}</span>
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
      <DefaultButton loading={loading} danger onClick={handleFinish}>
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
