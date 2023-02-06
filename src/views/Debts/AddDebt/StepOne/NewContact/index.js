import React, { useState } from 'react';
import { Search } from 'assets/images';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from 'components/Button/Icon';
import Input from 'components/Input';
import { searchContact } from 'global/redux/debt/thunk';

import { divideSpaceIdCard } from 'utils/helpers';
import { selectCard, selectDebt } from 'core/selectors';

import './style.scss';

const NewContact = () => {
  const dispatch = useDispatch();

  const [contact, setContact] = useState(null);

  const { isLoading: loading, debtInfo } = useSelector(selectDebt);
  const { payingCard } = useSelector(selectCard);
  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleSearch = async () => {
    const cardNumber = getValues('cardNumber');
    if (cardNumber === payingCard?.cardNumber) {
      setError('cardNumber', {
        type: 'custom',
        message: 'This is your card number',
      });
      return;
    }
    clearErrors();
    const {
      payload: { status, contact: searchedContact },
    } = await dispatch(searchContact({ cardNumber }));

    if (status) {
      setContact(searchedContact);
    }
  };

  return (
    <div className='contact-container'>
      <div className='search-contact'>
        <div className='contact-input'>
          <Input
            name='cardNumber'
            register={register}
            disabled={loading}
            error={errors?.cardNumber && true}
            label={
              errors?.cardNumber?.message
                ? errors?.cardNumber?.message
                : 'Card number'
            }
            placeholder='Enter the contact’s card number'
          />
        </div>
        <div className='contact-btn'>
          <IconButton
            loading={loading}
            type='button'
            danger
            onClick={handleSearch}
          >
            <Search width={20} height={20} />
          </IconButton>
        </div>
      </div>
      {debtInfo?.dest?.cardNumber && (
        <div className='contact-tab'>
          <div className='tab-line'>
            <span>Name:</span>
            <span>{contact?.contactName}</span>
            <span>Bank:</span>
            <span>EIGHT.Bank</span>
          </div>
          <div className='tab-line'>
            <span>Card number:</span>
            <span>{divideSpaceIdCard(contact?.cardNumber)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewContact;
