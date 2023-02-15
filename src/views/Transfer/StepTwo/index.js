import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import Radio from 'components/Radio';
import Stepper from 'components/Stepper';
import { selectAccount, selectCard, selectTransfer } from 'core/selectors';
import { updateTransferInfo } from 'global/redux/transfer/slice';
import ContactsTable from './ContactsTable';
import NewContact from './NewContact';

import './style.scss';

const EXIST_CONTACT = 'existContact';
const NEW_CONTACT = 'newContact';

const StepTwo = ({ setToggle, next }) => {
  const dispatch = useDispatch();

  const [radio, setRadio] = useState(EXIST_CONTACT);

  const { t } = useTranslation('translation', { keyPrefix: 'Pages.Transfer' });
  const { handleSubmit } = useForm();
  const { payingCard } = useSelector(selectCard);
  const { currentAccount } = useSelector(selectAccount);
  const { transferInfo } = useSelector(selectTransfer);

  const tabs = {
    existContact: <ContactsTable />,
    newContact: <NewContact />,
  };

  const handleClickRadio = (e) => {
    setRadio(e.target.value);
    dispatch(updateTransferInfo({ dest: { contactId: '' } }));
  };

  const handleNext = () => {
    if (transferInfo?.dest?.contactId) {
      const updateData = {
        paymentMethod: 'paymentCard',
        from: {
          cardNumber: payingCard?.cardNumber,
          cardId: payingCard?.id,
          accountName: currentAccount?.accountName,
          bank: 'EIGHT.Bank',
        },
      };

      dispatch(
        updateTransferInfo({
          ...updateData,
        })
      );
      next();
    }
  };

  return (
    <Modal setToggle={setToggle} title={t('internal')} cancel clickOutSide>
      <form className='step-two' onSubmit={handleSubmit(handleNext)}>
        <Stepper title={t('contact')} step='2'>
          {t('provideTheInfo')}
        </Stepper>
        <div className='radio-group'>
          <Radio
            name='contact'
            onChange={handleClickRadio}
            value={EXIST_CONTACT}
            checked={radio === 'existContact'}
            label={t('existContact')}
          />
          <Radio
            name='contact'
            value={NEW_CONTACT}
            checked={radio === 'newContact'}
            onChange={handleClickRadio}
            label={t('newContact')}
          />
        </div>
        <div className='step-two-container'>{tabs[radio]}</div>
        <div className='btn-group'>
          <div className='step-two-btn'>
            <DefaultButton onClick={setToggle}>{t('cancel')}</DefaultButton>
          </div>
          <div className='step-two-btn'>
            <DefaultButton
              danger={transferInfo?.dest?.contactId && true}
              type='submit'
            >
              {t('next')}
            </DefaultButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};

StepTwo.defaultProps = {
  setToggle: () => {},
  next: () => {},
};

StepTwo.propTypes = {
  setToggle: PropTypes.func,
  next: PropTypes.func,
};

export default StepTwo;
