import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from 'core/selectors';
import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';

import AuthLayout from 'layouts/Auth';
import Wrapper from 'components/Wrapper';
import { getLocalStorage, getMainPageByRole } from 'utils/helpers';
import { useNavigate } from 'react-router-dom';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const STEP_ONE = 1;
const STEP_TWO = 2;
const STEP_THREE = 3;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { currentUser } = useSelector(selectAuth);
  const { t } = useTranslation('translation', {
    keyPrefix: 'Pages.ForgotPassword',
  });
  const {
    formData: { step },
  } = useSelector(selectAuth);

  const titleForm =
    step === STEP_THREE ? t('createNewPassword') : t('forgotPassword');

  useEffect(() => {
    if (currentUser) {
      const role = getLocalStorage('role');
      navigate(getMainPageByRole(role));
    }
  }, [currentUser, navigate]);

  return (
    <AuthLayout>
      <Wrapper title={titleForm}>
        {step === STEP_ONE ? (
          <StepOne />
        ) : step === STEP_TWO ? (
          <StepTwo />
        ) : (
          <StepThree />
        )}
      </Wrapper>
    </AuthLayout>
  );
};

export default ForgotPassword;
