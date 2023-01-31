import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import Radio from 'components/Radio';
import Stepper from 'components/Stepper';
import { selectAuth, selectCard, selectDebt } from 'core/selectors';
import { updateDebtInfo } from 'global/redux/debt/slice';
import NewContact from './NewContact';
import ContactsTable from './ContactTable';

import './style.scss';

const EXIST_CONTACT = 'existContact';
const NEW_CONTACT = 'newContact';

const StepOne = ({ setToggle, next }) => {
  const dispatch = useDispatch();

  const [radio, setRadio] = useState(EXIST_CONTACT);

  const { handleSubmit } = useForm();
  const { payingCard } = useSelector(selectCard);
  const { debtInfo } = useSelector(selectDebt);
  const { currentUser } = useSelector(selectAuth);

  const tabs = {
    existContact: <ContactsTable />,
    newContact: <NewContact />,
  };

  const handleClickRadio = (e) => {
    setRadio(e.target.value);
    dispatch(updateDebtInfo({ dest: { contactId: '' } }));
  };

  const handleNext = () => {
    const { cardNumber, id: cardId } = payingCard;

    dispatch(
      updateDebtInfo({
        from: {
          cardNumber,
          cardId,
          accountName: currentUser?.displayName,
          bank: 'EIGHT.Bank',
        },
      })
    );
    next();
  };

  return (
    <Modal setToggle={setToggle} title='Internal transfer' cancel clickOutSide>
      <form className='step-one' onSubmit={handleSubmit(handleNext)}>
        <Stepper title='Borrower account' step='1'>
          Provide the information of the borrower account
        </Stepper>
        <span>Add information:</span>
        <div className='radio-group'>
          <Radio
            name='contact'
            onChange={handleClickRadio}
            value={EXIST_CONTACT}
            checked={radio === 'existContact'}
            label='From your existing contacts'
          />
          <Radio
            name='contact'
            value={NEW_CONTACT}
            checked={radio === 'newContact'}
            onChange={handleClickRadio}
            label='From a new contact'
          />
        </div>
        <div className='step-two-container'>{tabs[radio]}</div>
        <div className='btn-group'>
          <div className='step-two-btn'>
            <DefaultButton onClick={setToggle}>Cancel</DefaultButton>
          </div>
          <div className='step-two-btn'>
            <DefaultButton
              danger={debtInfo?.dest?.contactId && true}
              type='submit'
            >
              Next
            </DefaultButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};

StepOne.defaultProps = {
  setToggle: () => {},
  next: () => {},
};

StepOne.propTypes = {
  setToggle: PropTypes.func,
  next: PropTypes.func,
};

export default StepOne;
