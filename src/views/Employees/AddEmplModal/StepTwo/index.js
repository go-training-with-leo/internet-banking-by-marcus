import React from 'react';

import Input from 'components/Input';
import Stepper from 'components/Stepper';

import './style.scss';

const StepTwo = () => {
  return (
    <form className='empl-modal'>
      <Stepper title='Personal information' step='2'>
        Provide the personal information of the account
      </Stepper>
      <Input label='Email:' placeholder='email@gmail.com' disabled />
      <Input label='Name:' placeholder='Enter the account’s name' />
      <Input label='Phone:' placeholder='Enter the account’s phone number' />
    </form>
  );
};

export default StepTwo;
