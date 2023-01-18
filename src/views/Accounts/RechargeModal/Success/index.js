import PropTypes from 'prop-types';
import React from 'react';

import DefaultButton from 'components/Button/Default';

import './style.scss';

const RechargeSuccess = ({ setToggle }) => {
  return (
    <div className='recharge-success-modal'>
      <p>
        You have successfully recharged the desired account.
        <br />
        All changes have been saved.
      </p>
      <DefaultButton danger onClick={setToggle}>
        OK
      </DefaultButton>
    </div>
  );
};

RechargeSuccess.defaultProps = {
  setToggle: () => {},
};

RechargeSuccess.propTypes = {
  setToggle: PropTypes.func,
};

export default RechargeSuccess;
