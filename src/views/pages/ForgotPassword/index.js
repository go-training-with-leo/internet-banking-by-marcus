import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Wrapper from 'components/Wrapper';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

import './style.scss';

const STEP_ONE = 1;
const STEP_TWO = 2;
const STEP_THREE = 3;

const ForgotPassword = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Pages.ForgotPassword',
  });
  const {
    formData: { step },
  } = useSelector((state) => state.auth);

  const titleForm =
    step === STEP_THREE ? t('createNewPassword') : t('forgotPassword');

  return (
    <Wrapper title={titleForm}>
      {step === STEP_ONE ? (
        <StepOne />
      ) : step === STEP_TWO ? (
        <StepTwo />
      ) : (
        <StepThree />
      )}
    </Wrapper>
  );
};

export default ForgotPassword;
