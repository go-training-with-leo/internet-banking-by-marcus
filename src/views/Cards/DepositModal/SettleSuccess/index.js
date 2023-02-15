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
import { useTranslation } from 'react-i18next';

const SettleSuccess = ({ setToggle, cardDetail }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation('translation', { keyPrefix: 'Pages.Cards' });
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
    <Modal title={t('settleInfo')} setToggle={setToggle} cancel clickOutSide>
      <div className='success-modal'>
        <div className='success-info-row'>
          <span className='title'>{t('cardNumber')}:</span>
          <span>{divideSpaceIdCard(cardDetail?.cardNumber)}</span>
        </div>
        <div className='success-info-row'>
          <span className='title'>{t('amount')}:</span>
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
        <DefaultButton loading={isLoading} onClick={handleSettle} danger>
          {t('settle')}
        </DefaultButton>
      </div>
    </Modal>
  );
};

export default SettleSuccess;
