import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import Stepper from 'components/Stepper';
import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';
import TextArea from 'components/TextArea';

import './style.scss';
import Radio from 'components/Radio';

const CHARGED_BY_SENDER = 'chargedBySender';
const CHARGED_BY_RECEIVER = 'chargedByReceiver';

const StepThree = ({ setToggle, back, next }) => {
  const [radio, setRadio] = useState(CHARGED_BY_SENDER);

  return (
    <Modal setToggle={setToggle} title='Internal transfer' cancel clickOutSide>
      <form className='step-three'>
        <Stepper title='Payment ' step='3'>
          Provide the details of the payment
        </Stepper>
        <div className='step-three-container'>
          <Input
            label='Total amount:'
            placeholder='Enter the amount of money'
          />
          <div className='step-three-textarea'>
            <TextArea
              label='Detail:'
              placeholder='Enter some details of the payment'
            />
          </div>
          <div className='radio-group'>
            <Radio
              name='charge'
              onChange={(e) => setRadio(e.target.value)}
              value={CHARGED_BY_SENDER}
              checked={radio === CHARGED_BY_SENDER}
              label='Charged by the sender (you)'
            />
            <Radio
              name='charge'
              value={CHARGED_BY_RECEIVER}
              checked={radio === CHARGED_BY_RECEIVER}
              onChange={(e) => setRadio(e.target.value)}
              label='Charged by the receiver'
            />
          </div>
        </div>
        <div className='btn-group'>
          <div className='step-three-btn'>
            <DefaultButton onClick={back}>Back</DefaultButton>
          </div>
          <div className='step-three-btn'>
            <DefaultButton danger onClick={next}>
              Next
            </DefaultButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};

StepThree.defaultProps = {
  setToggle: () => {},
  back: () => {},
  next: () => {},
};

StepThree.propTypes = {
  setToggle: PropTypes.func,
  back: PropTypes.func,
  next: PropTypes.func,
};

export default StepThree;
