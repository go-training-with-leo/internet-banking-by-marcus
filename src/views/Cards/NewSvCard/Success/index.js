import React from 'react';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';

import {
  convertTimestamp,
  divideSpaceIdCard,
  parseMoneyVnd,
} from 'utils/helpers';

import './style.scss';

const SuccessModal = ({ setToggle, savingCardInfo }) => {
  const date = new Date(savingCardInfo.createdAt);
  const seconds = date.getTime();
  const interestMoney = savingCardInfo.balance * savingCardInfo.interest;
  return (
    <Modal
      title='Saving card information'
      setToggle={setToggle}
      cancel
      clickOutSide
    >
      <div className='saving-info-modal'>
        <div className='saving-info-row'>
          <span className='title'>From card:</span>
          <span>{divideSpaceIdCard(savingCardInfo?.cardNumber)}</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Time deposit:</span>
          <span>{convertTimestamp(seconds + savingCardInfo.timeDeposit)}</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Rate (%): </span>
          <span>{savingCardInfo.interest * 10}%</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Balance:</span>
          <span>{parseMoneyVnd(savingCardInfo?.balance)} VND</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Interest:</span>
          <span>{parseMoneyVnd(interestMoney)} VND</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Total: </span>
          <span>
            {parseMoneyVnd(interestMoney + savingCardInfo.balance)} VND
          </span>
        </div>
        <DefaultButton onClick={setToggle} danger>
          OK
        </DefaultButton>
      </div>
    </Modal>
  );
};

export default SuccessModal;
