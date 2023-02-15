import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import TimeTracking from 'components/TimeTracking';
import Status from 'components/Status';
import { selectCard } from 'core/selectors';
import {
  convertTimestamp,
  divideSpaceIdCard,
  parseMoneyVnd,
} from 'utils/helpers';
import Success from './Success';
import SettleSuccess from './SettleSuccess';

import './style.scss';

const DEPOSIT = 'DEPOSIT';
const SUCCESS_DEPOSIT = 'SUCCESS_DEPOSIT';
const SUCCESS_SETTLE = 'SUCCESS_SETTLE';

const DepositModal = ({ setToggle, cardDetail }) => {
  const currentTime = new Date().getTime();

  const [step, setStep] = useState(DEPOSIT);
  const [settleData, setSettleData] = useState({});

  const { t } = useTranslation('translation', {
    keyPrefix: 'Pages.Cards',
  });
  const { payingCard, isDeleteSavingCardLoading: loading } =
    useSelector(selectCard);

  const calcInterestTime = cardDetail?.createdAt?.seconds
    ? new Date().getTime() / 1000 - cardDetail.createdAt.seconds
    : new Date().getTime() / 1000 - new Date(cardDetail?.createdAt) / 1000;

  const handleDeposit = async () => {
    if (cardDetail?.status === 'pending') return;
    const depositSaving = {
      ...cardDetail,
      fromPayingCardId: cardDetail?.fromPayingCard,
      savingCardId: cardDetail?.id,
      currentBalance: payingCard?.balance,
      interestMoney: cardDetail?.interestMoney,
      totalAmount: cardDetail?.balance,
    };
    setSettleData(depositSaving);
    setStep(SUCCESS_DEPOSIT);
  };

  const handleSettle = () => {
    const depositSaving = {
      ...cardDetail,
      fromPayingCardId: cardDetail?.fromPayingCard,
      savingCardId: cardDetail?.id,
      currentBalance: payingCard?.balance,
      interest: 0.03 / 100,
      interestMoney:
        (cardDetail.balance * (0.03 / 100) * calcInterestTime) / 31104000,
      totalAmount: cardDetail?.balance,
    };
    setSettleData(depositSaving);
    setStep(SUCCESS_SETTLE);
  };

  const modals = {
    DEPOSIT: (
      <Modal
        large
        title={t('depositDetail')}
        cancel
        clickOutSide
        setToggle={setToggle}
      >
        <div className='deposit-modal'>
          <div className='deposit-info-row'>
            <span className='title'>{t('cardNumber')}:</span>
            <span>{divideSpaceIdCard(cardDetail?.cardNumber)}</span>
          </div>
          <div className='deposit-info-row'>
            <span className='title'>{t('status')}:</span>
            <Status
              pending={cardDetail?.status === 'pending'}
              success={cardDetail?.status === 'success'}
            />
          </div>
          <div className='deposit-info-row'>
            <span className='title'>{t('balance')}:</span>
            <span>{parseMoneyVnd(cardDetail?.balance)} VND</span>
          </div>
          <div className='deposit-info-row'>
            <span className='title'>{t('settleRate')}:</span>
            <span>{0.03}%</span>
          </div>
          <div className='deposit-info-row'>
            <span className='title'>{t('depositRate')}:</span>
            <span>{cardDetail.interest * 100}%</span>
          </div>
          <div className='deposit-info-row'>
            <span className='title'>{t('currentTime')}:</span>
            <span>{convertTimestamp(currentTime)}</span>
          </div>
          <div className='deposit-info-row'>
            <span className='title'>{t('createdAt')}:</span>
            <span>
              {convertTimestamp(
                cardDetail?.createdAt?.seconds
                  ? cardDetail.createdAt.seconds * 1000
                  : cardDetail?.createdAt
              )}
            </span>
          </div>
          <div className='deposit-info-row'>
            <span className='title'>{t('depositTime')}:</span>
            <span>
              {convertTimestamp(
                cardDetail?.timeDeposit?.seconds
                  ? cardDetail.timeDeposit.seconds * 1000
                  : cardDetail?.timeDeposit
              )}
            </span>
          </div>
          <TimeTracking
            min={cardDetail?.createdAt}
            max={cardDetail?.timeDeposit}
            currentTime={currentTime}
          />
          <div className='btn-group'>
            <DefaultButton onClick={setToggle}>{t('cancel')}</DefaultButton>
            {cardDetail?.status === 'success' ? (
              <DefaultButton loading={loading} danger onClick={handleDeposit}>
                {t('confirm')}
              </DefaultButton>
            ) : (
              <DefaultButton loading={loading} onClick={handleSettle} danger>
                {t('settle')}
              </DefaultButton>
            )}
          </div>
        </div>
      </Modal>
    ),
    SUCCESS_DEPOSIT: <Success setToggle={setToggle} cardDetail={settleData} />,
    SUCCESS_SETTLE: (
      <SettleSuccess setToggle={setToggle} cardDetail={settleData} />
    ),
  };

  return modals[step];
};

export default DepositModal;
