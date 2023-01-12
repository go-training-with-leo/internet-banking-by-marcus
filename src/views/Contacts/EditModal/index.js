import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import Input from 'components/Input';
import Selection from 'components/Select';
import { ACB } from 'assets/images';

import './style.scss';

const options = [
  { id: 'OT1', label: 'EIGHT.Bank', value: 1, icon: ACB },
  { id: 'OT2', label: 'EIGHT.Bank', value: 2, icon: ACB },
];

const EditModal = ({ setToggle }) => {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (formData) => {
    console.warn(formData);
  };

  return (
    <Modal setToggle={setToggle} title='Edit contact' cancel clickOutSide>
      <form className='edit-modal' onSubmit={handleSubmit(onSubmit)}>
        <span>Enter the new infomation for this contact</span>
        <Controller
          control={control}
          name='bank'
          render={({ field: { onChange, value } }) => (
            <Selection
              options={options}
              value={value}
              name='bank'
              label='Bank'
              onChange={(val) => onChange(val)}
            />
          )}
        />
        <Input
          register={register}
          name='cardNumber'
          label='Card number'
          placeholder='Card number'
        />
        <Input
          register={register}
          name='name'
          label='Name'
          placeholder='Your name'
        />
        <div className='btn-modal'>
          <DefaultButton danger type='submit'>
            Save changes
          </DefaultButton>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
