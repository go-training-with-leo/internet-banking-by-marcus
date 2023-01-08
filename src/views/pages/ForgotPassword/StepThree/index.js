import React from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';
import Modal from 'components/Modal';
import { resetFormData } from 'global/redux/auth/slice';
import { resetPasswordAccount } from 'global/redux/auth/thunk';
import { useForm } from 'react-hook-form';
import { capitalizeFirstLetter } from 'utils/helpers';
import validPassword from './validation';

const SUCCESS = 4;

const StepThree = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation('translation', {
    keyPrefix: 'Pages.ForgotPassword',
  });
  const {
    formData: { email, step },
    isLoading: loading,
  } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validPassword) });

  const onSubmit = async (formData) => {
    const {
      payload: { status },
    } = await dispatch(
      resetPasswordAccount({
        ...formData,
        email,
      })
    );
    if (!status) {
      toast.error('Failed to reset password');
    }
  };

  const handleSuccess = () => {
    dispatch(resetFormData());
    navigate('/login');
  };

  return (
    <>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <p className='description'>{t('descriptNewPassword')}</p>
        <Input
          type='password'
          label={
            errors.newPassword
              ? capitalizeFirstLetter(errors.newPassword?.message)
              : t('newPasswordLabel')
          }
          placeholder={t('enterNewPassword')}
          register={register}
          disabled={loading}
          name='newPassword'
          key='newPassword'
          error={errors.newPassword}
        />
        <Input
          type='password'
          label={
            errors.renewPassword
              ? capitalizeFirstLetter(errors.renewPassword?.message)
              : t('confirmNewPasswordLabel')
          }
          placeholder={t('confirmNewPassword')}
          register={register}
          disabled={loading}
          name='renewPassword'
          key='renewPassword'
          error={errors.renewPassword?.message}
        />
        <div className='submit'>
          <DefaultButton loading={loading} type='submit' danger>
            {t('confirmPasswordChange')}
          </DefaultButton>
        </div>
      </form>
      {step === SUCCESS && (
        <Modal title={t('success')}>
          <div className='modal-content'>
            <p>
              {t('descriptSuccess')}
              <br />
              {t('introduceSuccess')}
            </p>
            <DefaultButton danger onClick={handleSuccess}>
              {t('confirm')}
            </DefaultButton>
          </div>
        </Modal>
      )}
    </>
  );
};

export default StepThree;
