import React from 'react';
import { useForm } from 'react-hook-form';

import TextAreaInput from '.';

export default {
  title: 'Input',
  component: TextAreaInput,
};

const TextArea = () => {
  const { register } = useForm();
  return (
    <TextAreaInput register={register} name='textAreaInput' label='Label' />
  );
};

export { TextArea };
