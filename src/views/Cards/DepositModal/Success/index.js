import React from 'react';

import Modal from 'components/Modal';

import './style.scss';
import DefaultButton from 'components/Button/Default';
import {
  convertTimestamp,
  divideSpaceIdCard,
  parseMoneyVnd,
} from 'utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { selectCard } from 'core/selectors';
import { rechargeSavingMoney } from 'global/redux/card/thunk';
import { useTranslation } from 'react-i18next';

const Success = ({ setToggle, cardDetail }) => {
  const dispatch = useDispatch();

  const { isDeleteSavingCardLoading: isLoading } = useSelector(selectCard);
  const { t } = useTranslation('translation', {
    keyPrefix: 'Pages.Cards',
  });

  const handleDeposit = async () => {
    const {
      payload: { status },
    } = await dispatch(rechargeSavingMoney(cardDetail));
    if (status) {
      setToggle();
    }
  };

  return (
    <Modal
      title='Deposit information'
      setToggle={setToggle}
      cancel
      clickOutSide
    >
      <div className='success-modal'>
        <div className='success-info-row'>
          <span className='title'>{t('cardNumber')}:</span>
          <span>{divideSpaceIdCard(cardDetail?.cardNumber)}</span>
        </div>
        <div className='success-info-row'>
          <span className='title'>{t('balance')}:</span>
          <span>{parseMoneyVnd(cardDetail?.balance)} VND</span>
        </div>
        <div className='success-info-row'>
          <span className='title'>{t('rate')}:</span>
          <span>{cardDetail.interest * 100}%</span>
        </div>
        <div className='success-info-row'>
          <span className='title'>{t('interestMoney')}:</span>
          <span>{parseMoneyVnd(cardDetail?.interestMoney)} VND</span>
        </div>
        <div className='success-info-row'>
          <span className='title'>{t('receive')}:</span>
          <span>
            {parseMoneyVnd(cardDetail.balance + cardDetail.interestMoney)} VND
          </span>
        </div>
        <div className='success-info-row'>
          <span className='title'>{t('createdAt')}:</span>
          <span>
            {convertTimestamp(
              cardDetail?.createdAt?.seconds
                ? cardDetail.createdAt.seconds * 1000
                : cardDetail?.createdAt
            )}
          </span>
        </div>
        <div className='success-info-row'>
          <span className='title'>{t('depositTime')}:</span>
          <span>
            {convertTimestamp(
              cardDetail?.timeDeposit?.seconds
                ? cardDetail.timeDeposit.seconds * 1000
                : new Date(cardDetail.timeDeposit)
            )}
          </span>
        </div>
        <DefaultButton loading={isLoading} onClick={handleDeposit} danger>
          OK
        </DefaultButton>
      </div>
    </Modal>
  );
};

export default Success;
