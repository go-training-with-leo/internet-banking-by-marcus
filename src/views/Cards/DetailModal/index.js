import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import React from 'react';
import {
  convertTimestamp,
  divideSpaceIdCard,
  parseMoneyVnd,
} from 'utils/helpers';

import './style.scss';

const DetailModal = ({ cardDetail, setToggle }) => {
  return (
    <Modal
      title='Saving card infomation'
      setToggle={setToggle}
      cancel
      clickOutSide
    >
      <div className='saving-info-modal'>
        <div className='saving-info-row'>
          <span className='title'>Card number:</span>
          <span>{divideSpaceIdCard(cardDetail?.cardNumber)}</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Balance:</span>
          <span>{parseMoneyVnd(cardDetail?.balance)} VND</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Rate:</span>
          <span>{cardDetail.interest * 100}%</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Interest money:</span>
          <span>{parseMoneyVnd(cardDetail?.interestMoney)} VND</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Total:</span>
          <span>
            {parseMoneyVnd(cardDetail.balance + cardDetail.interestMoney)} VND
          </span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Time deposit:</span>
          <span>
            {convertTimestamp(
              cardDetail.timeDeposit?.seconds
                ? cardDetail.timeDeposit.seconds * 1000
                : new Date(cardDetail.timeDeposit)
            )}
          </span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>Created at:</span>
          <span>
            {convertTimestamp(
              cardDetail?.createdAt?.seconds
                ? cardDetail.createdAt.seconds * 1000
                : cardDetail?.createdAt
            )}
          </span>
        </div>
        <DefaultButton onClick={setToggle} danger>
          OK
        </DefaultButton>
      </div>
    </Modal>
  );
};
export default DetailModal;
