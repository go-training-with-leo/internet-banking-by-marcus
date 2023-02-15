import React from 'react';
import { Search } from 'assets/images';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from 'components/Button/Icon';
import Input from 'components/Input';
import { useTranslation } from 'react-i18next';
import { divideSpaceIdCard, removeNonNumeric } from 'utils/helpers';
import { searchContact } from 'global/redux/transfer/thunk';
import { selectCard, selectTransfer } from 'core/selectors';

import './style.scss';

const NewContact = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation('translation', { keyPrefix: 'Pages.Transfer' });
  const { transferInfo, isLoading: loading } = useSelector(selectTransfer);
  const { payingCard } = useSelector(selectCard);
  const {
    getValues,
    setError,
    control,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleSearch = async () => {
    const cardNumber = removeNonNumeric(getValues('cardNumber'));
    if (cardNumber === payingCard?.cardNumber) {
      setError('cardNumber', {
        type: 'custom',
        message: t('thisIsYourCard'),
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
          <Controller
            name='cardNumber'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                name='cardNumber'
                disabled={loading}
                value={divideSpaceIdCard(removeNonNumeric(value))}
                onChange={(val) => onChange(val)}
                error={errors?.cardNumber && true}
                label={
                  errors?.cardNumber?.message
                    ? errors?.cardNumber?.message
                    : t('cardNumber')
                }
                placeholder={t('enterCardNumber')}
              />
            )}
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
            <span>{t('name')}:</span>
            <span>{transferInfo?.dest?.contactName}</span>
            <span>{t('bank')}:</span>
            <span>EIGHT.Bank</span>
          </div>
          <div className='tab-line'>
            <span>{t('cardNumber')}:</span>
            <span>{divideSpaceIdCard(transferInfo?.dest?.cardNumber)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewContact;
