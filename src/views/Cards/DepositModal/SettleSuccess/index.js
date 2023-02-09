import React from 'react';

import Modal from 'components/Modal';
import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from 'components/Button/Default';
import {
  convertTimestamp,
  divideSpaceIdCard,
  parseMoneyVnd,
} from 'utils/helpers';
import { rechargeSavingMoney } from 'global/redux/card/thunk';
import { selectCard } from 'core/selectors';

import './style.scss';

const SettleSuccess = ({ setToggle, cardDetail }) => {
  const dispatch = useDispatch();

  const { isDeleteSavingCardLoading: isLoading } = useSelector(selectCard);

  const handleSettle = async () => {
    const {
      payload: { status },
    } = await dispatch(rechargeSavingMoney(cardDetail));
    if (status) {
      setToggle();
    }
  };

  return (
    <Modal title='Settle information' setToggle={setToggle} cancel clickOutSide>
      <div className='success-modal'>
        <div className='success-info-row'>
          <span className='title'>Saving card number:</span>
          <span>{divideSpaceIdCard(cardDetail?.cardNumber)}</span>
        </div>
        <div className='success-info-row'>
          <span className='title'>Balance:</span>
          <span>{parseMoneyVnd(cardDetail?.balance)} VND</span>
        </div>
        <div className='success-info-row'>
          <span className='title'>Rate:</span>
          <span>{cardDetail.interest * 100}%</span>
        </div>
        <div className='success-info-row'>
          <span className='title'>Interest money:</span>
          <span>{parseMoneyVnd(cardDetail?.interestMoney)} VND</span>
        </div>
        <div className='success-info-row'>
          <span className='title'>Receive:</span>
          <span>
            {parseMoneyVnd(cardDetail.balance + cardDetail.interestMoney)} VND
          </span>
        </div>
        <div className='success-info-row'>
          <span className='title'>Created at:</span>
          <span>
            {convertTimestamp(
              cardDetail?.createdAt?.seconds
                ? cardDetail.createdAt.seconds * 1000
                : cardDetail?.createdAt
            )}
          </span>
        </div>
        <div className='success-info-row'>
          <span className='title'>Time deposit:</span>
          <span>
            {convertTimestamp(
              cardDetail?.timeDeposit?.seconds
                ? cardDetail.timeDeposit.seconds * 1000
                : new Date(cardDetail.timeDeposit)
            )}
          </span>
        </div>
        <DefaultButton loading={isLoading} onClick={handleSettle} danger>
          OK
        </DefaultButton>
      </div>
    </Modal>
  );
};

export default SettleSuccess;
