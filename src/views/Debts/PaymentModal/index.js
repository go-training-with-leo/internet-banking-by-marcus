import React from 'react';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';

import './style.scss';

const PaymentModal = ({ setToggle }) => {
  return (
    <Modal setToggle={setToggle} title='Debt payment' cancel clickOutSide>
      <div className='payment-modal'>
        <span>Are you sure you want to pay this debt?</span>
        <div className='detail-row'>
          <span className='title'>Lender:</span>
          <p>John Doe/5648 3909 7890 2421/EIGHT.Bank</p>
        </div>
        <div className='detail-row'>
          <span className='title'>Debtor:</span>
          <p>Mary Lambert/7758 2332 24109 8579/EIGHT.Bank</p>
        </div>
        <div className='detail-row'>
          <span className='title'>Amount:</span>
          <span>5 000 000 VND</span>
        </div>
        <div className='detail-row'>
          <span className='title'>Description:</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
            lectus gravida dui tristique consequat. Suspendisse id orci eget
            odio ultricies venenatis ultricies et diam. Vestibulum purus ante,
            convallis tristique ultricies vel, ullamcorper non lacus. Duis dolor
            augue, sollicitudin vitae nunc consectetur, euismod malesuada metus.
            Nam sed arcu dui. Mauris tellus elit, interdum ac accumsan vitae,
            laoreet ut lorem. Cras et congue ipsum. Nullam quis quam elit.
          </p>
        </div>
        <div className='payment-btn-group'>
          <DefaultButton onClick={setToggle}>Cancel</DefaultButton>
          <DefaultButton danger>Pay</DefaultButton>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;
