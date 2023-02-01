import PropTypes from 'prop-types';
import React from 'react';

import Input from 'components/Input';
import Modal from 'components/Modal';
import DefaultButton from 'components/Button/Default';

import './style.scss';

const NewSvCard = ({ setToggle }) => {
  return (
    <Modal title='New saving card' setToggle={setToggle} clickOutSide cancel>
      <form className='new-card'>
        <Input
          name='cardNumber'
          label='Card number'
          placeholder='Card number'
        />
        <Input
          name='timeDeposit'
          label='Time savings deposit'
          placeholder='Time savings deposit'
        />
        <Input
          name='balance'
          label='Balance'
          placeholder='Enter your balance'
        />
        <div className='btn-group'>
          <DefaultButton>Cancel</DefaultButton>
          <DefaultButton danger>Create</DefaultButton>
        </div>
      </form>
    </Modal>
  );
};

NewSvCard.defaultProps = {
  setToggle: () => {},
};

NewSvCard.propTypes = {
  setToggle: PropTypes.func,
};

export default NewSvCard;
