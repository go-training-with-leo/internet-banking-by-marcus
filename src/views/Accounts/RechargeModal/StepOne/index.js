import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';

import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';
import { rechargeMoney } from 'global/redux/account/thunk';
import { selectAccount } from 'core/selectors';
import {
  divideSpaceIdCard,
  parseMoneyVnd,
  removeNonNumeric,
} from 'utils/helpers';
import validBalance from './validation';

import './style.scss';

const StepOne = ({ accountDetail, next }) => {
  const dispatch = useDispatch();

  const { isLoading: loading } = useSelector(selectAccount);

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validBalance) });

  const onSubmit = async (formData) => {
    const { id } = accountDetail;
    const {
      payload: { status },
    } = await dispatch(rechargeMoney({ id, ...formData }));

    if (status) next();
  };

  return (
    <form className='recharge-modal' onSubmit={handleSubmit(onSubmit)}>
      <div className='recharge-line'>
        <span className='title'>Name:</span>
        <span>{accountDetail?.accountName}</span>
      </div>
      <div className='recharge-line'>
        <span className='title'>Card number:</span>
        <span>{divideSpaceIdCard(accountDetail?.cardNumber)}</span>
      </div>
      <div className='recharge-line'>
        <span className='title'>Balance:</span>
        <span>{parseMoneyVnd(accountDetail?.balance)} VND</span>
      </div>
      <Controller
        control={control}
        name='balance'
        render={({ field: { onChange, value } }) => (
          <Input
            name='balance'
            disabled={loading}
            value={parseMoneyVnd(removeNonNumeric(value))}
            onChange={(val) => onChange(val)}
            label='Total amount:'
            placeholder='Enter the amount of money'
            error={errors.balance?.message && true}
          />
        )}
      />
      <span>Or select an amount of money below:</span>
      <div className='balances-list'>
        <span
          className='balance'
          role='listitem'
          onClick={() => setValue('balance', 500000)}
        >
          500 000
        </span>
        <span
          className='balance'
          role='listitem'
          onClick={() => setValue('balance', 1000000)}
        >
          1 000 000
        </span>
        <span
          className='balance'
          role='listitem'
          onClick={() => setValue('balance', 5000000)}
        >
          5 000 000
        </span>
        <span
          className='balance'
          role='listitem'
          onClick={() => setValue('balance', 10000000)}
        >
          10 000 000
        </span>
      </div>
      <DefaultButton loading={loading} type='submit' danger>
        Next
      </DefaultButton>
    </form>
  );
};

export default StepOne;
