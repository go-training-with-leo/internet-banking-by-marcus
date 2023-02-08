import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import Input from 'components/Input';
import Selection from 'components/Select';
import { editContact } from 'global/redux/contact/thunk';
import { selectContact } from 'core/selectors';
import { ACB } from 'assets/images';

import './style.scss';
import { divideSpaceIdCard, removeNonNumeric } from 'utils/helpers';

const options = [
  { id: 'OT1', label: 'EIGHT.Bank', value: 'EIGHT.Bank', icon: ACB },
];

const EditModal = ({ setToggle, contactData }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, control, setValue } = useForm();
  const { isLoading: loading } = useSelector(selectContact);

  const onSubmit = async (formData) => {
    const { bank, contactName } = formData;

    const {
      payload: { status },
    } = await dispatch(editContact({ ...contactData, bank, contactName }));

    if (status) {
      setToggle();
    }
  };

  useEffect(() => {
    setValue('bank', contactData?.bank);
    setValue(
      'cardNumber',
      divideSpaceIdCard(removeNonNumeric(contactData?.cardNumber))
    );
    setValue('contactName', contactData?.contactName);
  }, []);

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
          disabled
          label='Card number'
          placeholder={contactData?.cardNumber}
        />
        <Input
          disabled={loading}
          register={register}
          name='contactName'
          label='Name'
          placeholder='Contact name'
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

export default EditModal;
