import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import Input from 'components/Input';
import Loader from 'components/Loader';
import Selection from 'components/Select';
import { addContact, searchContact } from 'global/redux/contact/thunk';
import { ACB } from 'assets/images';
import { useDebounce } from 'rooks';
import { selectAuth, selectContact } from 'core/selectors';
import { divideSpaceIdCard, removeNonNumeric } from 'utils/helpers';
import validContact from './validation';

import './style.scss';

const options = [
  { id: 'OT1', label: 'EIGHT.Bank', value: 'EIGHT.Bank', icon: ACB },
];

const AddContactModal = ({ setToggle }) => {
  const dispatch = useDispatch();

  const { isLoading: loading, isSearchAccount } = useSelector(selectContact);
  const { currentUser } = useSelector(selectAuth);
  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validContact) });

  const handleGetName = async (cardNumber) => {
    const {
      payload: { status, accountName },
    } = await dispatch(
      searchContact({ cardNumber: removeNonNumeric(cardNumber) })
    );
    if (status) {
      clearErrors('contactName');
      setValue('contactName', accountName);
    } else {
      setValue('contactName', '');
      setError('contactName', { type: 'custom', message: 'Not found' });
    }
  };

  const onSubmit = async (formData) => {
    if (formData.cardNumber.length < 16 || formData.contactName === '') {
      return;
    }
    const {
      payload: { status, message },
    } = await dispatch(
      addContact({
        ...formData,
        email: currentUser.email,
        cardNumber: removeNonNumeric(formData.cardNumber),
      })
    );

    if (status) {
      if (message === 'Success') {
        setToggle();
      } else if (message === 'Not found') {
        setError('cardNumber', {
          type: 'custom',
          message,
        });
      } else {
        setError('cardNumber', {
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
          defaultValue={options[0].value}
          render={({ field: { onChange, value } }) => (
            <Selection
              options={options}
              value={value}
              name='bank'
              label='Bank'
              onChange={(val) => {
                onChange(val);
              }}
            />
          )}
        />
        <Input
          disabled={loading}
          register={register}
          name='cardNumber'
          onChange={useDebounce((val) => {
            if (val.target.value === '') {
              clearErrors();
              setValue('contactName', '');
            } else if (val.target.value?.length < 16) {
              setValue(
                'cardNumber',
                divideSpaceIdCard(removeNonNumeric(val.target?.value))
              );
              setError('cardNumber', {
                type: 'custom',
                message: 'Card number must be at least 16 characters',
              });
              setValue('contactName', '');
            } else {
              clearErrors('cardNumber');
              setValue(
                'cardNumber',
                divideSpaceIdCard(removeNonNumeric(val.target?.value))
              );
              handleGetName(val.target?.value);
            }
          }, 500)}
          label={errors.cardNumber ? errors.cardNumber?.message : 'Card number'}
          placeholder='Enter the contact’s card number'
          error={errors.cardNumber && true}
        />
        {!isSearchAccount ? (
          <Input
            disabled={loading || isSearchAccount}
            register={register}
            name='contactName'
            error={errors?.contactName && true}
            label={errors?.contactName ? errors?.contactName?.message : 'Name'}
            placeholder='Enter the contact’s name'
          />
        ) : (
          <Loader large />
        )}
        <div className='btn-modal'>
          <DefaultButton loading={loading} danger type='submit'>
            Create
          </DefaultButton>
        </div>
      </form>
    </Modal>
  );
};

export default AddContactModal;
