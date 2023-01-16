import React from 'react';
import PropTypes from 'prop-types';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';

import './style.scss';

const SuccessModal = ({ setToggle }) => {
  return (
    <Modal title='SUCCESS!'>
      <div className='success-modal'>
        <p>
          You have succesfully transfered the amout of 5 000 000 VND to the
          account 7583 8394 9840 8492 / Justin Doe / EIGHT.Bank at 22/05
          13:30:51
        </p>
        <DefaultButton danger onClick={setToggle}>
          OK
        </DefaultButton>
      </div>
    </Modal>
  );
};

SuccessModal.defaultProps = {
  setToggle: () => {},
};

SuccessModal.propTypes = {
  setToggle: PropTypes.func,
};

export default SuccessModal;
