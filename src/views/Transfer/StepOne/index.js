import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';
import ListCardItem from 'components/ListCardItem';
import Modal from 'components/Modal';
import Radio from 'components/Radio';
import Stepper from 'components/Stepper';

import './style.scss';

const StepOne = ({ setToggle, next }) => {
  const [radio, setRadio] = useState('paymentCard');
  return (
    <Modal setToggle={setToggle} title='Internal transfer' cancel clickOutSide>
      <form className='step-one'>
        <Stepper title='Card' step='1'>
          Please pick a card to process this payment
        </Stepper>
        <div className='radio-group'>
          <Radio
            name='usingCard'
            onChange={(e) => setRadio(e.target.value)}
            value='paymentCard'
            checked={radio === 'paymentCard'}
            label='Use your payment card'
          />
          <Radio
            name='usingCard'
            value='savingCard'
            checked={radio === 'savingCard'}
            onChange={(e) => setRadio(e.target.value)}
            label='Use your saving cards'
          />
        </div>

        <div className='saving-card-container'>
          {radio === 'savingCard' && (
            <>
              <div className='input-saving-card'>
                <Input
                  name='cardNumber'
                  label='Card number'
                  placeholder='Enter card number for filtering'
                />
              </div>
              <span className='title'>Pick one from your card list</span>
              <div className='list-cards-container'>
                <ListCardItem
                  label='Mastercard'
                  value={1000000000}
                  cardId='4098'
                />
                <ListCardItem
                  label='Mastercard'
                  value={1000000000}
                  cardId='4098'
                />
                <ListCardItem
                  label='Mastercard'
                  value={1000000000}
                  cardId='4098'
                />
              </div>
            </>
          )}
        </div>
        <div className='btn-group'>
          <div className='step-one-btn'>
            <DefaultButton onClick={setToggle}>Cancel</DefaultButton>
          </div>
          <div className='step-one-btn'>
            <DefaultButton danger onClick={next}>
              Next
            </DefaultButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};

StepOne.defaultProps = {
  setToggle: () => {},
  next: () => {},
};

StepOne.propTypes = {
  setToggle: PropTypes.func,
  next: PropTypes.func,
};

export default StepOne;
