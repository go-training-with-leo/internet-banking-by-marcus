import PropType from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';

import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';
import Stepper from 'components/Stepper';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount } from 'core/selectors';
import { addNewCustomer } from 'global/redux/account/thunk';
import { yupResolver } from '@hookform/resolvers/yup';
import validBalance from './validation';

import './style.scss';

const StepThree = ({ back, next }) => {
  const dispatch = useDispatch();

  const {
    newAccount: { email, phoneNumber, accountName },
    isLoading: loading,
  } = useSelector(selectAccount);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validBalance),
  });

  const onSubmit = async (formData) => {
    const {
      payload: { status },
    } = await dispatch(
      addNewCustomer({
        email,
        phoneNumber,
        accountName,
        ...formData,
      })
    );
    if (status) {
      next();
    }
  };

  return (
    <form className='cust-modal' onSubmit={handleSubmit(onSubmit)}>
      <Stepper title='Intial balance' step='3'>
        Adjust intial value of balance
      </Stepper>
      <Input
        register={register}
        name='balance'
        label='Balance:'
        placeholder='Enter your balance'
        error={errors.balance?.message}
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
      <div className='add-cust-btn'>
        <div className='cust-btn'>
          <DefaultButton disabled={loading} onClick={back}>
            Back
          </DefaultButton>
        </div>
        <div className='cust-btn'>
          <DefaultButton loading={loading} type='submit' danger>
            Next
          </DefaultButton>
        </div>
      </div>
    </form>
  );
};

StepThree.defaultProps = {
  back: () => {},
  next: () => {},
};

StepThree.propTypes = {
  back: PropType.func,
  next: PropType.func,
};

export default StepThree;
