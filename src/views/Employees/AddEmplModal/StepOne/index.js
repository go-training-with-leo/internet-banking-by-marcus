import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';

import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';
import Stepper from 'components/Stepper';
import { capitalizeFirstLetter } from 'utils/helpers';
import { existEmail } from 'global/redux/account/thunk';
import { selectAccount } from 'core/selectors';
import validEmail from './validation';

import './style.scss';

const StepOne = ({ setToggle, next }) => {
  const dispatch = useDispatch();

  const { isLoading: loading } = useSelector(selectAccount);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validEmail) });

  const onSubmit = async (formData) => {
    const {
      payload: { message },
    } = await dispatch(existEmail(formData));

    if (message === 'Valid email') {
      next();
    } else
      setError('email', {
        type: 'custom',
        message,
      });
  };

  return (
    <form className='empl-modal' onSubmit={handleSubmit(onSubmit)}>
      <Stepper title='Sign-in information' step='1'>
        Provide the sign-in information
      </Stepper>
      <Input
        register={register}
        name='email'
        label={
          errors.email ? capitalizeFirstLetter(errors.email?.message) : 'Email:'
        }
        error={errors.email && true}
        placeholder='Enter the sign-in email'
      />
      <div className='add-empl-btn'>
        <div className='empl-btn'>
          <DefaultButton disabled={loading} onClick={setToggle}>
            Cancel
          </DefaultButton>
        </div>
        <div className='empl-btn'>
          <DefaultButton loading={loading} type='submit' danger>
            Next
          </DefaultButton>
        </div>
      </div>
    </form>
  );
};

StepOne.defaultProps = {
  setToggle: () => {},
  next: () => {},
};

StepOne.propTypes = {
  setToggle: PropTypes.func,
  next: PropTypes.func,
};

export default StepOne;
