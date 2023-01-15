import React, { useState } from 'react';

import DefaultButton from 'components/Button/Default';
import useToggle from 'components/hooks/useToggle';
import { InternalTransfer, InterBankTransfer } from 'assets/images';
import StepFour from './StepFour';
import StepFive from './StepFive';
import StepThree from './StepThree';
import StepTwo from './StepTwo';
import StepOne from './StepOne';

import './style.scss';

const STEP_ONE = 1;
const STEP_TWO = 2;
const STEP_THREE = 3;
const STEP_FOUR = 4;
const STEP_FIVE = 5;
// const FINAL_STEP = 6;

const Transfer = () => {
  const [showModal, setShowModal] = useToggle();
  const [step, setStep] = useState(STEP_ONE);

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
      {step === STEP_ONE && showModal && (
        <StepOne setToggle={setShowModal} next={() => setStep(STEP_TWO)} />
      )}
      {step === STEP_TWO && showModal && (
        <StepTwo
          setToggle={setShowModal}
          back={() => setStep(STEP_ONE)}
          next={() => setStep(STEP_THREE)}
        />
      )}
      {step === STEP_THREE && showModal && (
        <StepThree
          setToggle={setShowModal}
          back={() => setStep(STEP_TWO)}
          next={() => setStep(STEP_FOUR)}
        />
      )}
      {step === STEP_FOUR && showModal && (
        <StepFour
          setToggle={setShowModal}
          back={() => setStep(STEP_THREE)}
          next={() => setStep(STEP_FIVE)}
        />
      )}
      {step === STEP_FIVE && showModal && (
        <StepFive
          setToggle={setShowModal}
          back={() => setStep(STEP_FOUR)}
          next={() => setStep(6)}
        />
      )}
    </div>
  );
};

export default Transfer;
