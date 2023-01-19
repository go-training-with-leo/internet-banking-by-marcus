import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import Stepper from 'components/Stepper';
import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import Radio from 'components/Radio';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateTransferInfo } from 'global/redux/transfer/slice';
import { yupResolver } from '@hookform/resolvers/yup';
import validPayment from './validation';

import './style.scss';

const CHARGED_BY_SENDER = 'sender';
const CHARGED_BY_RECEIVER = 'receiver';

const StepThree = ({ setToggle, back, next }) => {
  const dispatch = useDispatch();

  const [radio, setRadio] = useState(CHARGED_BY_SENDER);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validPayment) });

  const handleNext = (formData) => {
    dispatch(updateTransferInfo({ ...formData, chargedBy: radio }));
    next();
  };

  return (
    <Modal setToggle={setToggle} title='Internal transfer' cancel clickOutSide>
      <form className='step-three' onSubmit={handleSubmit(handleNext)}>
        <Stepper title='Payment ' step='3'>
          Provide the details of the payment
        </Stepper>
        <div className='step-three-container'>
          <Input
            register={register}
            name='totalAmount'
            label={
              errors?.totalAmount
                ? 'Require field is a number at least 1 000 VND  '
                : 'Total amount:'
            }
            error={errors?.totalAmount && true}
            placeholder='Enter the amount of money'
          />
          <div className='step-three-textarea'>
            <TextArea
              register={register}
              name='detail'
              label='Detail:'
              placeholder='Enter some details of the payment'
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
          <div className='step-three-btn'>
            <DefaultButton onClick={back}>Back</DefaultButton>
          </div>
          <div className='step-three-btn'>
            <DefaultButton danger type='submit'>
              Next
            </DefaultButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};

StepThree.defaultProps = {
  setToggle: () => {},
  back: () => {},
  next: () => {},
};

StepThree.propTypes = {
  setToggle: PropTypes.func,
  back: PropTypes.func,
  next: PropTypes.func,
};

export default StepThree;
