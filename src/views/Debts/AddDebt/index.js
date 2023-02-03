import { resetDebtInfo } from 'global/redux/debt/slice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

import './style.scss';

const STEP_ONE = 'STEP_ONE';
const STEP_TWO = 'STEP_TWO';
const SUCCESS = 'SUCCESS';

const AddDebt = ({ setToggle }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(STEP_ONE);

  const handleSetToggle = () => {
    dispatch(resetDebtInfo());
    setToggle();
  };

  const modals = {
    STEP_ONE: (
      <StepOne setToggle={handleSetToggle} next={() => setStep(STEP_TWO)} />
    ),
    STEP_TWO: (
      <StepTwo
        setToggle={handleSetToggle}
        back={() => setStep(STEP_ONE)}
        next={() => setStep(SUCCESS)}
      />
    ),
  };

  return <div className='add-debt'>{modals[step]}</div>;
};

export default AddDebt;
