import React from 'react';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import { convertTimestamp, parseMoneyVnd } from 'utils/helpers';

import './style.scss';

const DetailModal = ({ setToggle, customerDetail }) => {
  const time = customerDetail.createdAt * 1000;

  return (
    <Modal
      title='Customer information'
      setToggle={setToggle}
      cancel
      clickOutSide
    >
      <div className='customer-info-modal'>
        <div className='customer-info-row'>
          <span className='title'>Name:</span>
          <span>{customerDetail?.accountName}</span>
        </div>
        <div className='customer-info-row'>
          <span className='title'>Email:</span>
          <span>{customerDetail?.email}</span>
        </div>
        <div className='customer-info-row'>
          <span className='title'>Phone:</span>
          <span>{customerDetail?.phoneNumber}</span>
        </div>
        <div className='customer-info-row'>
          <span className='title'>Created at:</span>
          <span>{convertTimestamp(time)}</span>
        </div>
        <div className='customer-info-row'>
          <span className='title'>Total transfer:</span>
          <span>{parseMoneyVnd(10000)} VND</span>
        </div>
        <DefaultButton onClick={setToggle} danger>
          OK
        </DefaultButton>
      </div>
    </Modal>
  );
};

export default DetailModal;
