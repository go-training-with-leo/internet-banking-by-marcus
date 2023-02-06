import PropTypes from 'prop-types';
import React, { useState } from 'react';
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

const week = 6.048e8;

const options = [
  {
    id: 'TS-1',
    label: '1 week (0.1%)',
    value: { time: week, interest: 0.1 / 10 },
  },
  {
    id: 'TS-2',
    label: '1 month (0.4%)',
    value: { time: week * 4, interest: 0.4 / 10 },
  },
  {
    id: 'TS-3',
    label: '2 months (0.8%)',
    value: { time: week * 8, interest: 0.8 / 10 },
  },
  {
    id: 'TS-4',
    label: '3 months (1.2%)',
    value: { time: week * 12, interest: 1.2 / 10 },
  },
  {
    id: 'TS-5',
    label: '4 months (1.6%)',
    value: { time: week * 16, interest: 1.6 / 10 },
  },
  {
    id: 'TS-6',
    label: '5 months (2%)',
    value: { time: week * 20, interest: 2 / 10 },
  },
  {
    id: 'TS-7',
    label: '1 year (4.8%)',
    value: { time: week * 52, interest: 4.8 / 10 },
  },
];

const NewSvCard = ({ setToggle }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(STEP_ONE);
  const [savingCardInfo, setSavingCardInfo] = useState({});

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
      : 'The amount must be at least 10 000 VND';
  };

  return (
    <>
      {step === STEP_ONE && (
        <Modal
          title='New saving card'
          setToggle={setToggle}
          clickOutSide
          cancel
        >
          <form className='new-card' onSubmit={handleSubmit(onCreate)}>
            <Input
              disabled
              name='cardNumber'
              label='Source card'
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
                      : 'Balance'
                  }
                  placeholder='Enter your balance'
                />
              )}
            />
            <div className='btn-group'>
              <DefaultButton disabled={loading} onClick={setToggle}>
                Cancel
              </DefaultButton>
              <DefaultButton loading={loading} type='submit' danger>
                Create
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
