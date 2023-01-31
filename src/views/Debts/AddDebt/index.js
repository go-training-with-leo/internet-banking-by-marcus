import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

import './style.scss';

const STEP_ONE = 'STEP_ONE';
const STEP_TWO = 'STEP_TWO';
const SUCCESS = 'SUCCESS';

const AddDebt = ({ setToggle }) => {
  const [step, setStep] = useState(STEP_ONE);

  const modals = {
    STEP_ONE: <StepOne setToggle={setToggle} next={() => setStep(STEP_TWO)} />,
    STEP_TWO: (
      <StepTwo
        setToggle={setToggle}
        back={() => setStep(STEP_ONE)}
        next={() => setStep(SUCCESS)}
      />
    ),
  };

  return <div className='add-debt'>{modals[step]}</div>;
};

export default AddDebt;
