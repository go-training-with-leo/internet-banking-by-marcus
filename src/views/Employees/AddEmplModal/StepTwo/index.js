import PropType from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';

import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';
import Stepper from 'components/Stepper';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount } from 'core/selectors';
import { updateAccount } from 'global/redux/account/slice';

const StepTwo = ({ back, next }) => {
  const dispatch = useDispatch();

  const {
    newAccount: { email },
  } = useSelector(selectAccount);
  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {
    dispatch(updateAccount(formData));
    next();
  };

  return (
    <form className='empl-modal' onSubmit={handleSubmit(onSubmit)}>
      <Stepper title='Personal information' step='2'>
        Provide the personal information of the account
      </Stepper>
      <Input name='email' label='Email:' placeholder={email} disabled />
      <Input
        register={register}
        name='accountName'
        label='Name:'
        placeholder='Enter the account’s name'
      />
      <Input
        register={register}
        name='phoneNumber'
        label='Phone:'
        placeholder='Enter the account’s phone number'
      />
      <div className='add-empl-btn'>
        <div className='empl-btn'>
          <DefaultButton onClick={back}>Back</DefaultButton>
        </div>
        <div className='empl-btn'>
          <DefaultButton type='submit' danger>
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
