import React from 'react';
import PropTypes from 'prop-types';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import Stepper from 'components/Stepper';

import './style.scss';

const StepFive = ({ setToggle, back, next }) => {
  return (
    <Modal cancel clickOutSide setToggle={setToggle}>
      <form className='step-five'>
        <Stepper title='Finish' step='5'>
          Check your payment details again and finish the process
        </Stepper>
        <p>
          Your detailed payment information is below
          <br />
          Please check carefully before finishing the payment process
        </p>
        <div className='step-five-tab-info'>
          <div className='step-five-tab-info__line'>
            <span className='title'>From:</span>
            <span>1234 8909 9801 8901 / Albus Dumbledore / EIGHT.Bank</span>
          </div>
          <div className='step-five-tab-info__line'>
            <span className='title'>To:</span>
            <span>7583 8394 9840 8492 / Justin Doe / EIGHT.Bank</span>
          </div>
          <div className='step-five-tab-info__line'>
            <span className='title'>Amount:</span>
            <span>5 000 000 VND</span>
          </div>
          <div className='step-five-tab-info__line'>
            <span className='title'>Payment fee::</span>
            <span>Charged by receiver</span>
          </div>
        </div>
        <div className='btn-group'>
          <div className='step-five-btn'>
            <DefaultButton onClick={back}>Back</DefaultButton>
          </div>
          <div className='step-five-btn'>
            <DefaultButton onClick={next} danger>
              Next
            </DefaultButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};

StepFive.defaultProps = {
  setToggle: () => {},
  back: () => {},
  next: () => {},
};

StepFive.propTypes = {
  setToggle: PropTypes.func,
  back: PropTypes.func,
  next: PropTypes.func,
};

export default StepFive;
