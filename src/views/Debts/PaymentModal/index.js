import React, { useState } from 'react';

import Modal from 'components/Modal';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

import './style.scss';

const PAYMENT_DETAIL = 'PAYMENT_DETAIL';
const PAYMENT_VERIFY = 'PAYMENT_VERIFY';

const PaymentModal = ({ setToggle, debtDetail }) => {
  const [step, setStep] = useState(PAYMENT_DETAIL);

  const modals = {
    PAYMENT_DETAIL: (
      <StepOne
        debtDetail={debtDetail}
        setToggle={setToggle}
        next={() => setStep(PAYMENT_VERIFY)}
      />
    ),
    PAYMENT_VERIFY: (
      <StepTwo
        debtDetail={debtDetail}
        setToggle={setToggle}
        back={() => setStep(PAYMENT_DETAIL)}
      />
    ),
  };

  return (
    <Modal setToggle={setToggle} title='Debt payment' cancel clickOutSide>
      {modals[step]}
    </Modal>
  );
};

export default PaymentModal;
