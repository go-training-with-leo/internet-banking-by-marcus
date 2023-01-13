import React from 'react';

import DefaultButton from 'components/Button/Default';
import useToggle from 'components/hooks/useToggle';
import { InternalTransfer, InterBankTransfer } from 'assets/images';
import StepTwo from './StepTwo';

import './style.scss';

const Transfer = () => {
  const [showModal, setShowModal] = useToggle();

  return (
    <div className='transfer-view'>
      <div className='transfer-view-tab internal'>
        <div className='transfer-img'>
          <img src={InternalTransfer} alt='internal transfer' />
        </div>
        <div className='transfer-button'>
          <DefaultButton danger onClick={setShowModal}>
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
      {showModal && <StepTwo setToggle={setShowModal} />}
    </div>
  );
};

export default Transfer;
