import React from 'react';
import PropTypes from 'prop-types';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import Input from 'components/Input';
import Stepper from 'components/Stepper';

import './style.scss';

const StepFour = ({ setToggle, back, next }) => {
  return (
    <Modal setToggle={setToggle}>
      <form className='step-four'>
        <Stepper title='Verify ' step='4'>
          Verify your payment using OTP code
        </Stepper>
        <p>
          An OTP code has been sent to your email
          <br />
          Please check your inbox and follow the instructions
        </p>
        <Input label='OTP:' placeholder='Enter the OTP code' />
        <div className='btn-group'>
          <div className='step-four-btn'>
            <DefaultButton onClick={back}>Back</DefaultButton>
          </div>
          <div className='step-four-btn'>
            <DefaultButton onClick={next} danger>
              Next
            </DefaultButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};

StepFour.defaultProps = {
  setToggle: () => {},
  back: () => {},
  next: () => {},
};

StepFour.propTypes = {
  setToggle: PropTypes.func,
  back: PropTypes.func,
  next: PropTypes.func,
};

export default StepFour;
