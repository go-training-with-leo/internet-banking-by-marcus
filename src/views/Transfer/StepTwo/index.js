import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import Radio from 'components/Radio';
import Stepper from 'components/Stepper';
import ContactsTable from './ContactsTable';
import NewContact from './NewContact';
import tempData from './tempData';

import './style.scss';

const EXIST_CONTACT = 'existContact';
const NEW_CONTACT = 'newContact';

const tabs = {
  existContact: <ContactsTable tableData={tempData} />,
  newContact: <NewContact />,
};

const StepTwo = ({ setToggle, back, next }) => {
  const [radio, setRadio] = useState(EXIST_CONTACT);

  return (
    <Modal setToggle={setToggle} title='Internal transfer' cancel clickOutSide>
      <div className='step-two'>
        <Stepper title='Contact' step='2'>
          Provide the information of the receiver
        </Stepper>
        <form className='radio-group'>
          <Radio
            name='contact'
            onChange={(e) => setRadio(e.target.value)}
            value={EXIST_CONTACT}
            checked={radio === 'existContact'}
            label='From your existing contacts'
          />
          <Radio
            name='contact'
            value={NEW_CONTACT}
            checked={radio === 'newContact'}
            onChange={(e) => setRadio(e.target.value)}
            label='From a new contact'
          />
        </form>
        <div className='step-two-container'>{tabs[radio]}</div>
        <div className='btn-group'>
          <div className='step-two-btn'>
            <DefaultButton onClick={back}>Back</DefaultButton>
          </div>
          <div className='step-two-btn'>
            <DefaultButton danger onClick={next}>
              Next
            </DefaultButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

StepTwo.defaultProps = {
  setToggle: () => {},
  back: () => {},
  next: () => {},
};

StepTwo.propTypes = {
  setToggle: PropTypes.func,
  back: PropTypes.func,
  next: PropTypes.func,
};

export default StepTwo;
