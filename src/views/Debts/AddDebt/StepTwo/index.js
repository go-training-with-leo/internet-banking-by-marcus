import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'components/Modal';
import Stepper from 'components/Stepper';
import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import Radio from 'components/Radio';
import { addDebt } from 'global/redux/debt/thunk';
import { useForm } from 'react-hook-form';
import { selectDebt } from 'core/selectors';
import { yupResolver } from '@hookform/resolvers/yup';
import validPayment from './validation';

import './style.scss';

const CHARGED_BY_SENDER = 'sender';
const CHARGED_BY_RECEIVER = 'receiver';

const StepTwo = ({ setToggle, back }) => {
  const dispatch = useDispatch();

  const [radio, setRadio] = useState(CHARGED_BY_SENDER);

  const { isLoading: loading } = useSelector(selectDebt);
  const { debtInfo } = useSelector(selectDebt);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validPayment) });

  const handleNext = async (formData) => {
    const { totalAmount, desc } = formData;
    const {
      payload: { status },
    } = await dispatch(addDebt({ ...debtInfo, totalAmount, desc }));

    if (status) {
      setToggle();
    }
  };

  const handleCheckAmount = (message) => {
    return message === 'Your balance is not enough'
      ? 'Your balance is not enough'
      : 'The amount must be at least 10 000 VND';
  };

  return (
    <Modal setToggle={setToggle} title='Internal transfer' cancel clickOutSide>
      <form className='step-two' onSubmit={handleSubmit(handleNext)}>
        <Stepper title='Debt amount' step='2'>
          Provide the details of the debt amount
        </Stepper>
        <div className='step-two-container'>
          <Input
            register={register}
            name='totalAmount'
            label={
              errors?.totalAmount
                ? handleCheckAmount(errors?.totalAmount.message)
                : 'Total amount:'
            }
            error={errors?.totalAmount && true}
            placeholder='Enter the amount of money'
          />
          <div className='step-two-textarea'>
            <TextArea
              register={register}
              name='desc'
              label='Detail:'
              placeholder='Enter some descriptions for the debt'
            />
          </div>
          <div className='radio-group'>
            <Radio
              name='charge'
              onChange={(e) => setRadio(e.target.value)}
              value={CHARGED_BY_SENDER}
              checked={radio === CHARGED_BY_SENDER}
              label='Charged by the sender (you)'
            />
            <Radio
              name='charge'
              value={CHARGED_BY_RECEIVER}
              checked={radio === CHARGED_BY_RECEIVER}
              onChange={(e) => setRadio(e.target.value)}
              label='Charged by the receiver'
            />
          </div>
        </div>
        <div className='btn-group'>
          <div className='step-two-btn'>
            <DefaultButton disabled={loading} onClick={back}>
              Back
            </DefaultButton>
          </div>
          <div className='step-two-btn'>
            <DefaultButton loading={loading} danger type='submit'>
              Finish
            </DefaultButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};

StepTwo.defaultProps = {
  setToggle: () => {},
  back: () => {},
};

StepTwo.propTypes = {
  setToggle: PropTypes.func,
  back: PropTypes.func,
};

export default StepTwo;
