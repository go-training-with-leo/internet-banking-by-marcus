import React from 'react';
import { useForm } from 'react-hook-form';

import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';

import './style.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import validBalance from './validation';

const StepOne = ({ next }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validBalance) });

  const onSubmit = (formData) => {
    console.warn(formData);
    next();
  };

  return (
    <form className='recharge-modal' onSubmit={handleSubmit(onSubmit)}>
      <Input
        register={register}
        name='balance'
        label='Balance:'
        placeholder='Enter your balance'
        error={errors.balance?.message || true}
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
      <DefaultButton type='submit' danger>
        Next
      </DefaultButton>
    </form>
  );
};

export default StepOne;
