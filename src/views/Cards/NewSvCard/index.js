import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from 'components/Input';
import Modal from 'components/Modal';
import DefaultButton from 'components/Button/Default';
import { useSelector } from 'react-redux';
import { selectCard } from 'core/selectors';
import { divideSpaceIdCard } from 'utils/helpers';
import validSavingCard from './validation';

import './style.scss';

const NewSvCard = ({ setToggle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: yupResolver(validSavingCard) });

  const { payingCard } = useSelector(selectCard);

  const onCreate = (formData) => {
    if (payingCard.balance - formData.balance < 0) {
      setError('balance', {
        type: 'custom',
        message: 'Balance must at least 10 000 VND',
      });
      return;
    }
    console.warn('Log');
  };

  return (
    <Modal title='New saving card' setToggle={setToggle} clickOutSide cancel>
      <form className='new-card' onSubmit={handleSubmit(onCreate)}>
        <Input
          disabled
          name='cardNumber'
          label='Card number'
          placeholder={divideSpaceIdCard(payingCard?.cardNumber)}
        />
        <Input
          register={register}
          name='timeDeposit'
          label='Time savings deposit'
          placeholder='Time savings deposit'
        />
        <Input
          register={register}
          name='balance'
          error={errors?.balance && true}
          label={
            errors?.balance ? 'Balance must at least 10 000 VND' : 'Balance'
          }
          placeholder='Enter your balance'
        />
        <div className='btn-group'>
          <DefaultButton onClick={setToggle}>Cancel</DefaultButton>
          <DefaultButton type='submit' danger>
            Create
          </DefaultButton>
        </div>
      </form>
    </Modal>
  );
};

NewSvCard.defaultProps = {
  setToggle: () => {},
};

NewSvCard.propTypes = {
  setToggle: PropTypes.func,
};

export default NewSvCard;
