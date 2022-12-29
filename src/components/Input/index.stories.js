import React from 'react';

import Input from 'components/Input';
import { useForm } from 'react-hook-form';

export default {
  title: 'Input',
  component: Input,
};
const Password = () => {
  const { register } = useForm();
  return (
    <Input
      label='Password'
      name='passwordInput'
      type='password'
      register={register}
      withIcon
    />
  );
};

const ErrorPasswordIcon = () => {
  const { register } = useForm();
  return (
    <Input
      label='Password'
      name='passwordInput'
      type='password'
      register={register}
      error
      withIcon
    />
  );
};

const Email = () => {
  const { register } = useForm();
  return (
    <Input
      label='Email'
      name='emailInput'
      type='email'
      register={register}
      withIcon
    />
  );
};

const Error = () => {
  const { register } = useForm();
  return (
    <Input
      label='Error'
      name='errorInput'
      type='text'
      register={register}
      withIcon
      error
    />
  );
};

const ErrorNoIcon = () => {
  const { register } = useForm();
  return (
    <Input
      label='Error'
      name='errorInput'
      type='text'
      register={register}
      error
    />
  );
};

const Disabled = () => {
  const { register } = useForm();
  return (
    <Input
      label='Disabled'
      name='disabledInput'
      type='text'
      register={register}
      disabled
    />
  );
};

export { Email, Password, Error, ErrorNoIcon, ErrorPasswordIcon, Disabled };
