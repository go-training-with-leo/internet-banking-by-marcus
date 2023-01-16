import React from 'react';

import Input from 'components/Input';
import Stepper from 'components/Stepper';

import './style.scss';

const StepOne = () => {
  return (
    <form className='empl-modal'>
      <Stepper title='Sign-in information' step='1'>
        Provide the sign-in information
      </Stepper>
      <Input
        name='email'
        label='Email:'
        placeholder='Enter the sign-in email'
      />
    </form>
  );
};

export default StepOne;
