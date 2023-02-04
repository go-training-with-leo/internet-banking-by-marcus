import React from 'react';
import { Search } from 'assets/images';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from 'components/Button/Icon';
import Input from 'components/Input';
import { divideSpaceIdCard } from 'utils/helpers';
import { searchContact } from 'global/redux/transfer/thunk';
import { selectCard, selectTransfer } from 'core/selectors';

import './style.scss';

const NewContact = () => {
  const dispatch = useDispatch();

  const { transferInfo, isLoading: loading } = useSelector(selectTransfer);
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
    dispatch(searchContact({ cardNumber }));
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
      {transferInfo?.dest?.cardNumber && (
        <div className='contact-tab'>
          <div className='tab-line'>
            <span>Name:</span>
            <span>{transferInfo?.dest?.contactName}</span>
            <span>Bank:</span>
            <span>EIGHT.Bank</span>
          </div>
          <div className='tab-line'>
            <span>Card number:</span>
            <span>{divideSpaceIdCard(transferInfo?.dest?.cardNumber)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewContact;
