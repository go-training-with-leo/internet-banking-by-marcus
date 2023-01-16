import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Modal from 'components/Modal';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import Success from './Success';

import './style.scss';

const STEP_ONE = 'PROVIDE_EMAIL';
const STEP_TWO = 'PROVIDE_INFO';
const SUCCESS = 'SUCCESS';

const AddEmplModal = ({ setToggle }) => {
  const [step, setStep] = useState(STEP_ONE);

  const steps = {
    PROVIDE_EMAIL: (
      <StepOne setToggle={setToggle} next={() => setStep(STEP_TWO)} />
    ),
    PROVIDE_INFO: (
      <StepTwo back={() => setStep(STEP_ONE)} next={() => setStep(SUCCESS)} />
    ),
    SUCCESS: <Success setToggle={setToggle} />,
  };

  return (
    <Modal title='Add an employee' setToggle={setToggle} cancel clickOutSide>
      {steps[step]}
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
