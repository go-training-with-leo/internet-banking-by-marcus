import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from 'components/Input';
import Modal from 'components/Modal';
import DefaultButton from 'components/Button/Default';
import Selection from 'components/Select';
import { useDispatch, useSelector } from 'react-redux';
import { selectCard } from 'core/selectors';
import { addSavingCard } from 'global/redux/card/thunk';
import {
  divideSpaceIdCard,
  parseMoneyVnd,
  removeNonNumeric,
} from 'utils/helpers';
import validSavingCard from './validation';

import './style.scss';
import SuccessModal from './Success';

const STEP_ONE = 'STEP_ONE';
const STEP_TWO = 'STEP_TWO';

const week = 604800;

const NewSvCard = ({ setToggle }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(STEP_ONE);
  const [savingCardInfo, setSavingCardInfo] = useState({});

  const { t } = useTranslation('translation', { keyPrefix: 'Pages.Cards' });

  const options = [
    {
      id: 'TS-1',
      label: `1 ${t('week')} (0.2%)`,
      value: { time: week, interest: 0.2 / 100 },
    },
    {
      id: 'TS-2',
      label: `1 ${t('month')} (0.8%)`,
      value: { time: 2629746, interest: 0.8 / 100 },
    },
    {
      id: 'TS-3',
      label: `2 ${t('months')} (1.6%)`,
      value: { time: 5259492, interest: 1.6 / 100 },
    },
    {
      id: 'TS-4',
      label: `3 ${t('month')} (2.4%)`,
      value: { time: 7889238, interest: 2.4 / 100 },
    },
    {
      id: 'TS-5',
      label: `4 ${t('month')} (3.2%)`,
      value: { time: 10518984, interest: 3.2 / 100 },
    },
    {
      id: 'TS-6',
      label: `5 ${t('month')} (4%)`,
      value: { time: 13148730, interest: 4 / 100 },
    },
    {
      id: 'TS-7',
      label: `1 ${t('year')} (9.6%)`,
      value: { time: 31556952, interest: 9.6 / 100 },
    },
  ];

  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm({ resolver: yupResolver(validSavingCard) });

  const { payingCard, isAddSavingCardLoading: loading } =
    useSelector(selectCard);

  const onCreate = async (formData) => {
    if (payingCard.balance - formData.balance < 0) {
      setError('balance', {
        type: 'custom',
        message: 'Your balance is not enough',
      });
      return;
    }

    const {
      payload: { status, savingCard },
    } = await dispatch(
      addSavingCard({
        cardId: payingCard?.id,
        totalAmount: formData.balance,
        timeDeposit: formData?.timeDeposit.time,
        interest: formData?.timeDeposit.interest,
      })
    );

    if (status) {
      setSavingCardInfo({
        cardNumber: payingCard?.cardNumber,
        balance: formData.balance,
        timeDeposit: formData?.timeDeposit.time,
        interest: formData?.timeDeposit.interest,
        createdAt: savingCard?.createdAt,
      });
      setStep(STEP_TWO);
    }
  };

  const handleCheckAmount = (message) => {
    return message === 'Your balance is not enough'
      ? 'Your balance is not enough'
      : 'The amount must be at least 500 000 VND';
  };

  return (
    <>
      {step === STEP_ONE && (
        <Modal
          title={t('newSavingCard')}
          setToggle={setToggle}
          clickOutSide
          cancel
        >
          <form className='new-card' onSubmit={handleSubmit(onCreate)}>
            <Input
              disabled
              name='cardNumber'
              label={t('sourceCard')}
              value={divideSpaceIdCard(payingCard?.cardNumber)}
            />
            <Controller
              control={control}
              name='timeDeposit'
              defaultValue={options[0].value}
              render={({ field: { onChange, value } }) => (
                <Selection
                  options={options}
                  value={value}
                  name='timeDeposit'
                  label='Time deposit'
                  onChange={(val) => onChange(val)}
                />
              )}
            />
            <Controller
              control={control}
              name='balance'
              render={({ field: { onChange, value } }) => (
                <Input
                  name='balance'
                  value={parseMoneyVnd(removeNonNumeric(value))}
                  onChange={(val) => onChange(val)}
                  error={errors?.balance && true}
                  label={
                    errors?.balance
                      ? handleCheckAmount(errors?.balance.message)
                      : `${t('amount')}`
                  }
                  placeholder={t('enterYourBalance')}
                />
              )}
            />
            <div className='btn-group'>
              <DefaultButton disabled={loading} onClick={setToggle}>
                {t('cancel')}
              </DefaultButton>
              <DefaultButton loading={loading} type='submit' danger>
                {t('create')}
              </DefaultButton>
            </div>
          </form>
        </Modal>
      )}
      {step === STEP_TWO && (
        <SuccessModal savingCardInfo={savingCardInfo} setToggle={setToggle} />
      )}
    </>
  );
};

NewSvCard.defaultProps = {
  setToggle: () => {},
};

NewSvCard.propTypes = {
  setToggle: PropTypes.func,
};

export default NewSvCard;
