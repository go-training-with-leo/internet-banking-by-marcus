import React, { useState } from 'react';

import Modal from 'components/Modal';
import StepOne from './StepOne';
import RechargeSuccess from './Success';

const STEP_ONE = 'STEP_ONE';
const SUCCESS = 'SUCCESS';

const RechargeModal = ({ setToggle }) => {
  const [step, setStep] = useState(STEP_ONE);

  const modals = {
    STEP_ONE: <StepOne next={() => setStep(SUCCESS)} />,
    SUCCESS: <RechargeSuccess setToggle={setToggle} />,
  };

  return (
    <Modal
      title='Recharge an account'
      cancel
      clickOutSide
      setToggle={setToggle}
    >
      {modals[step]}
    </Modal>
  );
};

export default RechargeModal;
