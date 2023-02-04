import React from 'react';

import Modal from 'components/Modal';

import './style.scss';

const InterBank = ({ setToggle }) => {
  return (
    <Modal title='Interbank transfer' clickOutSide cancel setToggle={setToggle}>
      <div className='coming-soon'>
        <h1>COMING SOON</h1>
      </div>
    </Modal>
  );
};

export default InterBank;
