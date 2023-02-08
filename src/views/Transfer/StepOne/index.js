import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';
import ListCardItem from 'components/ListCardItem';
import Modal from 'components/Modal';
import Radio from 'components/Radio';
import Stepper from 'components/Stepper';
import useMergeState from 'components/hooks/useMergeState';
import { updateTransferInfo } from 'global/redux/transfer/slice';
import { useDispatch, useSelector } from 'react-redux';
import { get4LastDigit } from 'utils/helpers';
import { selectAccount, selectCard } from 'core/selectors';

import './style.scss';

const StepOne = ({ setToggle, next }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useMergeState({
    paymentMethod: 'paymentCard',
  });
  const [listCards, setListCards] = useState();

  const { currentAccount } = useSelector(selectAccount);
  const { payingCard, savingCards } = useSelector(selectCard);
  const { register, handleSubmit, watch } = useForm();

  const watchFilter = watch('cardNumber');

  const checkSubmit = () => {
    return listCards?.length === 0 && formData?.paymentMethod === 'savingCard';
  };

  const onSubmit = () => {
    if (checkSubmit()) {
      return;
    }
    const updateData = {
      paymentMethod: formData?.paymentMethod,
      from: {
        cardNumber:
          formData?.paymentMethod === 'savingCard'
            ? formData?.cardNumber
            : payingCard?.cardNumber,
        cardId:
          formData?.paymentMethod === 'savingCard'
            ? formData?.savingCardId
            : payingCard?.id,
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
  };

  useEffect(() => {
    const filterCards = savingCards?.filter((card) =>
      card?.cardNumber.includes(watchFilter)
    );
    setListCards(filterCards);
  }, [watchFilter]);

  useEffect(() => {
    setListCards(savingCards);
    if (savingCards) {
      setFormData({
        savingCardId: savingCards[0]?.id,
        cardNumber: savingCards[0]?.cardNumber,
      });
    }
  }, []);

  return (
    <Modal setToggle={setToggle} title='Internal transfer' cancel clickOutSide>
      <form className='step-one' onSubmit={handleSubmit(onSubmit)}>
        <Stepper title='Card' step='1'>
          Please pick a card to process this payment
        </Stepper>
        <div className='radio-group'>
          <Radio
            name='usingCard'
            onChange={(e) => setFormData({ paymentMethod: e.target.value })}
            value='paymentCard'
            checked={formData.paymentMethod === 'paymentCard'}
            label='Use your payment card'
          />
        </div>

        <div className='saving-card-container'>
          {formData.paymentMethod === 'savingCard' && (
            <>
              <div className='input-saving-card'>
                <Input
                  register={register}
                  name='cardNumber'
                  label='Card number'
                  placeholder='Enter card number for filtering'
                />
              </div>
              <span className='title'>Pick one from your card list</span>
              <div className='list-cards-container'>
                {listCards.length > 0 ? (
                  listCards?.map((savingCard) => (
                    <ListCardItem
                      isActive={savingCard?.id === formData?.savingCardId}
                      label={savingCard?.bank}
                      value={savingCard?.balance}
                      onClick={() => {
                        setFormData({
                          savingCardId: savingCard?.id,
                          cardNumber: savingCard?.cardNumber,
                        });
                      }}
                      cardId={get4LastDigit(savingCard?.cardNumber)}
                    />
                  ))
                ) : (
                  <span>No saving cards</span>
                )}
              </div>
            </>
          )}
        </div>
        <div className='btn-group'>
          <div className='step-one-btn'>
            <DefaultButton onClick={setToggle}>Cancel</DefaultButton>
          </div>
          <div className='step-one-btn'>
            <DefaultButton danger={!checkSubmit()} type='submit'>
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
