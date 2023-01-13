import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';
import ListCardItem from 'components/ListCardItem';
import Modal from 'components/Modal';
import Radio from 'components/Radio';
import Stepper from 'components/Stepper';

import './style.scss';

const StepOne = ({ setToggle }) => {
  const [radio, setRadio] = useState('paymentCard');
  return (
    <Modal setToggle={setToggle} title='Internal transfer' cancel clickOutSide>
      <div className='step-one'>
        <Stepper title='Card' step='1'>
          Please pick a card to process this payment
        </Stepper>
        <form className='radio-group'>
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
        </form>

        <div className='saving-card-container'>
          <div className='input-saving-card'>
            <Input
              name='cardNumber'
              label='Card number'
              placeholder='Enter card number for filtering'
            />
          </div>
          {radio === 'savingCard' && (
            <>
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
            <DefaultButton danger>Next</DefaultButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

StepOne.defaultProps = {
  setToggle: () => {},
};

StepOne.propTypes = {
  setToggle: PropTypes.func,
};

export default StepOne;
