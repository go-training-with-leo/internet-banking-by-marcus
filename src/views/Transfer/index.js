import React from 'react';

import DefaultButton from 'components/Button/Default';
import { InternalTransfer, InterBankTransfer } from 'assets/images';

import './style.scss';

const Transfer = () => {
  return (
    <div className='transfer-view'>
      <div className='transfer-view-tab internal'>
        <div className='transfer-img'>
          <img src={InternalTransfer} alt='internal transfer' />
        </div>
        <div className='transfer-button'>
          <DefaultButton danger>EIGHT.Bank internal transfer</DefaultButton>
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
    </div>
  );
};

export default Transfer;
