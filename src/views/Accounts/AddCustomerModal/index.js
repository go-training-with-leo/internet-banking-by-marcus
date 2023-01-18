import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Modal from 'components/Modal';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import Success from './Success';

import './style.scss';

const STEP_ONE = 'PROVIDE_EMAIL';
const STEP_TWO = 'PROVIDE_INFO';
const STEP_THREE = 'INIT_BALANCE';
const SUCCESS = 'SUCCESS';

const AddCustomerModal = ({ setToggle }) => {
  const [step, setStep] = useState(STEP_ONE);

  const steps = {
    PROVIDE_EMAIL: (
      <StepOne setToggle={setToggle} next={() => setStep(STEP_TWO)} />
    ),
    PROVIDE_INFO: (
      <StepTwo
        back={() => setStep(STEP_ONE)}
        next={() => setStep(STEP_THREE)}
      />
    ),
    INIT_BALANCE: (
      <StepThree back={() => setStep(STEP_TWO)} next={() => setStep(SUCCESS)} />
    ),
    SUCCESS: <Success setToggle={setToggle} />,
  };

  return (
    <Modal title='Add an account' setToggle={setToggle} cancel clickOutSide>
      {steps[step]}
    </Modal>
  );
};

AddCustomerModal.defaultProps = {
  setToggle: () => {},
};

AddCustomerModal.propTypes = {
  setToggle: PropTypes.func,
};

export default AddCustomerModal;
