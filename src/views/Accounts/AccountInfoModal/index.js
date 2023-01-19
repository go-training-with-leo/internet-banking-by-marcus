import PropTypes from 'prop-types';
import React from 'react';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import {
  convertTimestamp,
  divideSpaceIdCard,
  parseMoneyVnd,
} from 'utils/helpers';

import './style.scss';

const AccountInfoModal = ({ setToggle, accountDetail }) => {
  const time = accountDetail.createdAt.seconds * 1000;
  return (
    <Modal title='Account details' setToggle={setToggle} cancel clickOutSide>
      <div className='account-info-modal'>
        <div className='account-info-row'>
          <span className='title'>Name:</span>
          <span>{accountDetail?.accountName}</span>
        </div>
        <div className='account-info-row'>
          <span className='title'>Email:</span>
          <span>{accountDetail?.email}</span>
        </div>
        <div className='account-info-row'>
          <span className='title'>Phone:</span>
          <span>{accountDetail?.phoneNumber}</span>
        </div>
        <div className='account-info-row'>
          <span className='title'>Card Number:</span>
          <span>{divideSpaceIdCard(accountDetail?.cardNumber)}</span>
        </div>
        <div className='account-info-row'>
          <span className='title'>Balance:</span>
          <span>{parseMoneyVnd(accountDetail?.balance)} VND</span>
        </div>
        <div className='account-info-row'>
          <span className='title'>Created at:</span>
          <span>{convertTimestamp(time)}</span>
        </div>
        <DefaultButton onClick={setToggle} danger>
          OK
        </DefaultButton>
      </div>
    </Modal>
  );
};

AccountInfoModal.defaultProps = {
  setToggle: () => {},
};

AccountInfoModal.propTypes = {
  setToggle: PropTypes.func,
};

export default AccountInfoModal;
