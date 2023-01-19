import PropTypes from 'prop-types';
import React, { useState } from 'react';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import Input from 'components/Input';

import './style.scss';

const CHANGE_PWD = 'CHANGE_PWD';
const SUCCESS = 'SUCCESS';

const titles = {
  CHANGE_PWD: 'Change password',
  SUCCESS: 'SUCCESS!',
};

const descriptions = {
  CHANGE_PWD: <p>Follow the instructions to change your password</p>,
  SUCCESS: (
    <p>
      You have successfully changed your password!
      <br />
      You can now use your new sign-in information to log in to your account
    </p>
  ),
};

const ChangePasswordModal = ({ setToggle }) => {
  const [step, setStep] = useState(CHANGE_PWD);

  return (
    <Modal setToggle={setToggle} title={titles[step]} cancel clickOutSide>
      <div className='change-pwd-modal'>
        {descriptions[step]}
        {step === CHANGE_PWD && (
          <>
            <Input
              label='Current password'
              placeholder='Enter your current password'
            />
            <Input label='New password' placeholder='Enter your new password' />
            <Input
              label='Confirm password'
              placeholder='Re-enter your new password'
            />
            <DefaultButton danger onClick={() => setStep(SUCCESS)}>
              Save changes
            </DefaultButton>
          </>
        )}
        {step === SUCCESS && (
          <DefaultButton danger onClick={setToggle}>
            OK
          </DefaultButton>
        )}
      </div>
    </Modal>
  );
};

ChangePasswordModal.defaultProps = {
  setToggle: () => {},
};

ChangePasswordModal.propTypes = {
  setToggle: PropTypes.func,
};

export default ChangePasswordModal;
