import PropType from 'prop-types';
import React from 'react';

import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';
import Stepper from 'components/Stepper';

import './style.scss';

const StepTwo = ({ back, next }) => {
  return (
    <form className='empl-modal'>
      <Stepper title='Personal information' step='2'>
        Provide the personal information of the account
      </Stepper>
      <Input label='Email:' placeholder='email@gmail.com' disabled />
      <Input label='Name:' placeholder='Enter the account’s name' />
      <Input label='Phone:' placeholder='Enter the account’s phone number' />
      <div className='add-empl-btn'>
        <div className='empl-btn'>
          <DefaultButton onClick={back}>Back</DefaultButton>
        </div>
        <div className='empl-btn'>
          <DefaultButton danger onClick={next}>
            Next
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
