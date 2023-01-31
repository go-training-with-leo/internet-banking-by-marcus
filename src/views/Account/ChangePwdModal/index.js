import PropTypes from 'prop-types';
import React, { useState } from 'react';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import Input from 'components/Input';

import { updatePassword } from 'global/redux/account/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount } from 'core/selectors';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validPassword from './validation';

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
  const dispatch = useDispatch();

  const [step, setStep] = useState(CHANGE_PWD);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validPassword) });
  const { isLoading: loading } = useSelector(selectAccount);

  const onSave = async (formData) => {
    const {
      payload: { status },
    } = await dispatch(updatePassword({ ...formData }));
    if (status) {
      setStep(SUCCESS);
    } else {
      setError('currentPassword', {
        type: 'custom',
        message: 'Wrong password',
      });
    }
  };

  return (
    <Modal setToggle={setToggle} title={titles[step]} cancel clickOutSide>
      <form className='change-pwd-modal' onSubmit={handleSubmit(onSave)}>
        {descriptions[step]}
        {step === CHANGE_PWD && (
          <>
            <Input
              register={register}
              name='currentPassword'
              type='password'
              label={
                errors?.currentPassword
                  ? errors?.currentPassword?.message
                  : 'Current password'
              }
              error={errors?.currentPassword && true}
              placeholder='Enter your current password'
            />
            <Input
              register={register}
              name='newPassword'
              type='password'
              label={
                errors?.newPassword
                  ? errors?.newPassword?.message
                  : 'New password'
              }
              error={errors?.newPassword && true}
              placeholder='Enter your new password'
            />
            <Input
              register={register}
              name='confirmPassword'
              type='password'
              label={
                errors?.confirmPassword
                  ? errors?.confirmPassword?.message
                  : 'Confirm password'
              }
              error={errors?.confirmPassword && true}
              placeholder='Re-enter your new password'
            />
            <DefaultButton loading={loading} danger type='submit'>
              Save changes
            </DefaultButton>
          </>
        )}
        {step === SUCCESS && (
          <DefaultButton danger onClick={setToggle}>
            OK
          </DefaultButton>
        )}
      </form>
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
