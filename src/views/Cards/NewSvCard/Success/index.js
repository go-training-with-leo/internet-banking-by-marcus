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
import { useTranslation } from 'react-i18next';

const SuccessModal = ({ setToggle }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.Cards' });
  const { newSavingCard, payingCard } = useSelector(selectCard);

  return (
    <Modal
      title={t('savingCardInfo')}
      setToggle={setToggle}
      cancel
      clickOutSide
    >
      <div className='saving-info-modal'>
        <div className='saving-info-row'>
          <span className='title'>{t('sourceCard')}:</span>
          <span>{divideSpaceIdCard(payingCard?.cardNumber)}</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>{t('cardNumber')}:</span>
          <span>{divideSpaceIdCard(newSavingCard?.cardNumber)}</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>{t('rate')} (%): </span>
          <span>{newSavingCard.interest * 100}%</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>{t('balance')}:</span>
          <span>{parseMoneyVnd(newSavingCard?.balance)} VND</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>{t('interest')}:</span>
          <span>{parseMoneyVnd(newSavingCard?.interestMoney)} VND</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>{t('total')}: </span>
          <span>
            {parseMoneyVnd(newSavingCard.interestMoney + newSavingCard.balance)}{' '}
            VND
          </span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>{t('createdAt')}: </span>
          <span>{convertTimestamp(newSavingCard.createdAt)}</span>
        </div>
        <div className='saving-info-row'>
          <span className='title'>{t('timeDeposit')}:</span>
          <span>{convertTimestamp(newSavingCard.timeDeposit)}</span>
        </div>
        <DefaultButton onClick={setToggle} danger>
          {t('ok')}
        </DefaultButton>
      </div>
    </Modal>
  );
};

export default SuccessModal;
