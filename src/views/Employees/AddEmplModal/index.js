import PropTypes from 'prop-types';
import React, { useState } from 'react';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import StepOne from './StepOne';

import StepTwo from './StepTwo';
import Success from './Success';

import './style.scss';

const STEP_ONE = 1;
const STEP_TWO = 2;
const SUCCESS = 3;

const steps = {
  1: <StepOne />,
  2: <StepTwo />,
  3: <Success />,
};

const AddEmplModal = ({ setToggle }) => {
  const [step, setStep] = useState(STEP_ONE);

  return (
    <Modal title='Add an employee' setToggle={setToggle} cancel clickOutSide>
      {steps[step]}
      <div className='add-empl-btn'>
        {step === STEP_ONE && (
          <>
            <div className='empl-btn'>
              <DefaultButton onClick={setToggle}>Cancel</DefaultButton>
            </div>
            <div className='empl-btn'>
              <DefaultButton danger onClick={() => setStep(step + 1)}>
                Next
              </DefaultButton>
            </div>
          </>
        )}
        {step === STEP_TWO && (
          <>
            <div className='empl-btn'>
              <DefaultButton onClick={() => setStep((prev) => prev - 1)}>
                Back
              </DefaultButton>
            </div>
            <div className='empl-btn'>
              <DefaultButton danger onClick={() => setStep(step + 1)}>
                Next
              </DefaultButton>
            </div>
          </>
        )}
        {step === SUCCESS && (
          <div className='empl-btn-finish'>
            <DefaultButton danger onClick={setToggle}>
              OK
            </DefaultButton>
          </div>
        )}
      </div>
    </Modal>
  );
};

AddEmplModal.defaultProps = {
  setToggle: () => {},
};

AddEmplModal.propTypes = {
  setToggle: PropTypes.func,
};

export default AddEmplModal;
