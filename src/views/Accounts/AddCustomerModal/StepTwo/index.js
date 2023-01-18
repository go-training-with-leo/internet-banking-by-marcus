import PropType from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';

import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';
import Stepper from 'components/Stepper';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount } from 'core/selectors';
import { updateAccount } from 'global/redux/account/slice';
import { yupResolver } from '@hookform/resolvers/yup';
import { capitalizeFirstLetter } from 'utils/helpers';
import validInfo from './validation';

import './style.scss';

const StepTwo = ({ back, next }) => {
  const dispatch = useDispatch();

  const {
    newAccount: { email },
    isLoading: loading,
  } = useSelector(selectAccount);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validInfo) });

  const onSubmit = async (formData) => {
    dispatch(updateAccount({ ...formData }));
    next();
  };

  return (
    <form className='cust-modal' onSubmit={handleSubmit(onSubmit)}>
      <Stepper title='Personal information' step='2'>
        Provide the personal information of the account
      </Stepper>
      <Input name='email' label='Email:' placeholder={email} disabled />
      <Input
        register={register}
        name='accountName'
        label={
          errors.accountName
            ? capitalizeFirstLetter(errors.accountName?.message)
            : 'Name:'
        }
        error={errors.accountName && true}
        placeholder='Enter the account’s name'
      />
      <Input
        register={register}
        name='phoneNumber'
        label={
          errors.phoneNumber
            ? capitalizeFirstLetter(errors.phoneNumber?.message)
            : 'Phone:'
        }
        error={errors.phoneNumber && true}
        placeholder='Enter the account’s phone number'
      />
      <div className='add-cust-btn'>
        <div className='cust-btn'>
          <DefaultButton disabled={loading} onClick={back}>
            Back
          </DefaultButton>
        </div>
        <div className='cust-btn'>
          <DefaultButton loading={loading} type='submit' danger>
            Create
          </DefaultButton>
        </div>
      </div>
    </form>
  );
};

StepTwo.defaultProps = {
  back: () => {},
  next: () => {},
};

StepTwo.propTypes = {
  back: PropType.func,
  next: PropType.func,
};

export default StepTwo;
