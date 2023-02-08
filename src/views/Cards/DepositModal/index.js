import React, { useState } from 'react';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';

import TimeTracking from 'components/TimeTracking';
import Status from 'components/Status';
import { convertTimestamp } from 'utils/helpers';

import { useDispatch, useSelector } from 'react-redux';
import { rechargeSavingMoney } from 'global/redux/card/thunk';
import { selectCard } from 'core/selectors';
import Success from './Success';

import './style.scss';

const DEPOSIT = 'DEPOSIT';
const SUCCESS_DEPOSIT = 'SUCCESS_DEPOSIT';
const SUCCESS_SETTLE = 'SUCCESS_SETTLE';

const DepositModal = ({ setToggle, cardDetail }) => {
  const dispatch = useDispatch();
  const currentTime = new Date().getTime();

  const [step, setStep] = useState(DEPOSIT);

  const { payingCard, isDeleteSavingCardLoading: loading } =
    useSelector(selectCard);

  const calcInterestTime = cardDetail?.timeDeposit?.seconds
    ? cardDetail.timeDeposit.seconds - cardDetail.createdAt.seconds
    : (new Date(cardDetail?.timeDeposit) - new Date(cardDetail?.createdAt)) /
      1000;

  const handleDeposit = async () => {
    if (cardDetail?.status === 'pending') return;
    const {
      payload: { status },
    } = await dispatch(
      rechargeSavingMoney({
        fromPayingCardId: cardDetail?.fromPayingCard,
        savingCardId: cardDetail?.id,
        currentBalance: payingCard?.balance,
        interestMoney: cardDetail?.interestMoney,
        totalAmount: cardDetail?.balance,
      })
    );
    if (status) {
      setStep(SUCCESS_DEPOSIT);
    }
  };

  const handleSettle = async () => {
    const {
      payload: { status },
    } = await dispatch(
      rechargeSavingMoney({
        fromPayingCardId: cardDetail?.fromPayingCard,
        savingCardId: cardDetail?.id,
        currentBalance: payingCard?.balance,
        interestMoney:
          (cardDetail.balance * (0.03 / 100) * calcInterestTime) / 31104000,
        totalAmount: cardDetail?.balance,
      })
    );
    if (status) {
      setStep(SUCCESS_SETTLE);
    }
  };

  const modals = {
    DEPOSIT: (
      <Modal
        large
        title='Deposit detail'
        cancel
        clickOutSide
        setToggle={setToggle}
      >
        <div className='deposit-modal'>
          <div className='deposit-info-row'>
            <span className='title'>Status:</span>
            <Status
              pending={cardDetail?.status === 'pending'}
              success={cardDetail?.status === 'success'}
            />
          </div>
          <div className='deposit-info-row'>
            <span className='title'>Current time:</span>
            <span>{convertTimestamp(currentTime)}</span>
          </div>
          <div className='deposit-info-row'>
            <span className='title'>Created at:</span>
            <span>
              {convertTimestamp(
                cardDetail?.createdAt?.seconds
                  ? cardDetail.createdAt.seconds * 1000
                  : cardDetail?.createdAt
              )}
            </span>
          </div>
          <div className='deposit-info-row'>
            <span className='title'>Time deposit:</span>
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
            <DefaultButton onClick={setToggle}>Cancel</DefaultButton>
            {cardDetail?.status === 'success' ? (
              <DefaultButton loading={loading} danger onClick={handleDeposit}>
                Confirm
              </DefaultButton>
            ) : (
              <DefaultButton loading={loading} onClick={handleSettle} danger>
                Settle
              </DefaultButton>
            )}
          </div>
        </div>
      </Modal>
    ),
    SUCCESS_DEPOSIT: <Success setToggle={setToggle} cardDetail={cardDetail} />,
    SUCCESS_SETTLE: (
      <Success
        setToggle={setToggle}
        cardDetail={{
          ...cardDetail,
          interest: 0.03 / 100,
          interestMoney:
            (cardDetail.balance * (0.03 / 100) * calcInterestTime) / 31104000,
        }}
      />
    ),
  };

  return modals[step];
};

export default DepositModal;
