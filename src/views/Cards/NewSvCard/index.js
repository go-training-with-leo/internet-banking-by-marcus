import PropTypes from 'prop-types';
import React from 'react';
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

const options = [
  { id: 'TS-1', label: '1 week (0.2%)', value: 604800 },
  { id: 'TS-2', label: '1 month (0.5%)', value: 2592000 },
  { id: 'TS-3', label: '2 months (0.7%)', value: 2592000 },
  { id: 'TS-4', label: '3 months (0.9%)', value: 2592000 },
  { id: 'TS-5', label: '4 months (1%)', value: 2592000 },
  { id: 'TS-6', label: '5 months (1.3%)', value: 2592000 },
  { id: 'TS-7', label: '1 year (1.7%)', value: 31536000 },
];

const NewSvCard = ({ setToggle }) => {
  const dispatch = useDispatch();

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
      payload: { status },
    } = await dispatch(
      addSavingCard({
        cardId: payingCard?.id,
        totalAmount: formData.balance,
        timeDeposit: formData?.timeDeposit,
      })
    );

    if (status) {
      setToggle();
    }
  };

  const handleCheckAmount = (message) => {
    return message === 'Your balance is not enough'
      ? 'Your balance is not enough'
      : 'The amount must be at least 10 000 VND';
  };

  return (
    <Modal title='New saving card' setToggle={setToggle} clickOutSide cancel>
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
  );
};

NewSvCard.defaultProps = {
  setToggle: () => {},
};

NewSvCard.propTypes = {
  setToggle: PropTypes.func,
};

export default NewSvCard;
