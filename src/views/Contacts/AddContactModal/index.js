import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import Input from 'components/Input';
import Selection from 'components/Select';
import { ACB } from 'assets/images';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'global/redux/contact/thunk';
import { selectAuth, selectContact } from 'core/selectors';
import { yupResolver } from '@hookform/resolvers/yup';
import validContact from './validation';

const options = [
  { id: 'OT1', label: 'EIGHT.Bank', value: 1, icon: ACB },
  { id: 'OT2', label: 'EIGHT.Bank', value: 2, icon: ACB },
];

const AddContactModal = ({ setToggle }) => {
  const dispatch = useDispatch();

  const { isLoading: loading } = useSelector(selectContact);
  const { currentUser } = useSelector(selectAuth);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validContact) });

  const onSubmit = async (formData) => {
    const {
      payload: { status, message },
    } = await dispatch(addContact({ email: currentUser.email, ...formData }));

    if (status) {
      if (message === 'Success') {
        setToggle();
      } else if (message === 'Not found') {
        setError('cardNumber', {
          type: 'custom',
          message,
        });
      } else {
        setError('contactName', {
          type: 'custom',
          message,
        });
      }
    }
  };

  return (
    <Modal setToggle={setToggle} title='Add new contact' cancel clickOutSide>
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
          disabled={loading}
          register={register}
          name='cardNumber'
          label={errors.cardNumber ? errors.cardNumber?.message : 'Card number'}
          placeholder='Card number'
          error={errors.cardNumber && true}
        />
        <Input
          disabled={loading}
          register={register}
          name='contactName'
          label={
            errors.contactName?.message ? errors.contactName?.message : 'Name'
          }
          error={errors.contactName?.message && true}
          placeholder='Your name'
        />
        <div className='btn-modal'>
          <DefaultButton loading={loading} danger type='submit'>
            Save changes
          </DefaultButton>
        </div>
      </form>
    </Modal>
  );
};

export default AddContactModal;
