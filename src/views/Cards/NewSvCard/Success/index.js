import React from 'react';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';

import {
  convertTimestamp,
  divideSpaceIdCard,
  parseMoneyVnd,
} from 'utils/helpers';

import './style.scss';
import { useSelector } from 'react-redux';
import { selectCard } from 'core/selectors';

const SuccessModal = ({ setToggle }) => {
  const { newSavingCard, payingCard } = useSelector(selectCard);

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
          <span>{divideSpaceIdCard(payingCard?.cardNumber)}</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Card number:</span>
          <span>{divideSpaceIdCard(newSavingCard?.cardNumber)}</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Rate (%): </span>
          <span>{newSavingCard.interest * 100}%</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Balance:</span>
          <span>{parseMoneyVnd(newSavingCard?.balance)} VND</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Interest:</span>
          <span>{parseMoneyVnd(newSavingCard?.interestMoney)} VND</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Total: </span>
          <span>
            {parseMoneyVnd(newSavingCard.interestMoney + newSavingCard.balance)}{' '}
            VND
          </span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Created at: </span>
          <span>{convertTimestamp(newSavingCard.createdAt)}</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Time deposit:</span>
          <span>{convertTimestamp(newSavingCard.timeDeposit)}</span>
        </div>
        <DefaultButton onClick={setToggle} danger>
          OK
        </DefaultButton>
      </div>
    </Modal>
  );
};

export default SuccessModal;
