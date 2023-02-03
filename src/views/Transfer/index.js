import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import DefaultButton from 'components/Button/Default';
import useToggle from 'components/hooks/useToggle';
import { resetTransferInfo } from 'global/redux/transfer/slice';
import { InternalTransfer, InterBankTransfer } from 'assets/images';
import StepFour from './StepFour';
import StepFive from './StepFive';
import StepThree from './StepThree';
import StepTwo from './StepTwo';
import StepOne from './StepOne';

import './style.scss';
import SuccessModal from './SuccessModal';

const STEP_ONE = 'STEP_ONE';
const STEP_TWO = 'STEP_TWO';
const STEP_THREE = 'STEP_THREE';
const STEP_FOUR = 'STEP_FOUR';
const STEP_FIVE = 'STEP_FIVE';
const SUCCESS = 'SUCCESS';

const Transfer = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useToggle();
  const [step, setStep] = useState(STEP_ONE);

  const handleSetToggle = () => {
    dispatch(resetTransferInfo());
    setShowModal();
  };

  const modals = {
    STEP_ONE: (
      <StepOne setToggle={handleSetToggle} next={() => setStep(STEP_TWO)} />
    ),
    STEP_TWO: (
      <StepTwo
        setToggle={handleSetToggle}
        back={() => setStep(STEP_ONE)}
        next={() => setStep(STEP_THREE)}
      />
    ),
    STEP_THREE: (
      <StepThree
        setToggle={handleSetToggle}
        back={() => setStep(STEP_TWO)}
        next={() => setStep(STEP_FOUR)}
      />
    ),
    STEP_FOUR: (
      <StepFour
        setToggle={handleSetToggle}
        back={() => setStep(STEP_THREE)}
        next={() => setStep(STEP_FIVE)}
      />
    ),
    STEP_FIVE: (
      <StepFive
        setToggle={handleSetToggle}
        back={() => setStep(STEP_FOUR)}
        next={() => setStep(SUCCESS)}
      />
    ),
    SUCCESS: <SuccessModal setToggle={handleSetToggle} />,
  };

  return (
    <div className='transfer-view'>
      <div className='transfer-view-tab internal'>
        <div className='transfer-img'>
          <img src={InternalTransfer} alt='internal transfer' />
        </div>
        <div className='transfer-button'>
          <DefaultButton
            danger
            onClick={() => {
              setShowModal();
              setStep(STEP_ONE);
            }}
          >
            EIGHT.Bank internal transfer
          </DefaultButton>
        </div>
      </div>
      <div className='transfer-view-tab interbank'>
        <div className='transfer-img'>
          <img src={InterBankTransfer} alt='interbank transfer' />
        </div>
        <div className='transfer-button'>
          <DefaultButton>Interbank transfer</DefaultButton>
        </div>
      </div>
      {showModal && modals[step]}
    </div>
  );
};

export default Transfer;
