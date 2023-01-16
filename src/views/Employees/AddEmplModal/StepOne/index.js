import PropTypes from 'prop-types';
import React from 'react';

import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';
import Stepper from 'components/Stepper';

import './style.scss';

const StepOne = ({ setToggle, next }) => {
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
      <div className='add-empl-btn'>
        <div className='empl-btn'>
          <DefaultButton onClick={setToggle}>Cancel</DefaultButton>
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

StepOne.defaultProps = {
  setToggle: () => {},
  next: () => {},
};

StepOne.propTypes = {
  setToggle: PropTypes.func,
  next: PropTypes.func,
};

export default StepOne;
