import React from 'react';

import Modal from 'components/Modal';
import DefaultButton from 'components/Button/Default';
import { convertTimestamp } from 'utils/helpers';

import './style.scss';

const EmplDetail = ({ emplDetail, setToggle }) => {
  const time = emplDetail.createdAt.seconds * 1000;
  return (
    <Modal title='Employee detail' setToggle={setToggle} clickOutSide cancel>
      <div className='empl-info-modal'>
        <div className='empl-info-row'>
          <span className='title'>Name:</span>
          <span>{emplDetail?.accountName}</span>
        </div>
        <div className='empl-info-row'>
          <span className='title'>Email:</span>
          <span>{emplDetail?.email}</span>
        </div>
        <div className='empl-info-row'>
          <span className='title'>Phone:</span>
          <span>{emplDetail?.phoneNumber}</span>
        </div>
        <div className='empl-info-row'>
          <span className='title'>Created at:</span>
          <span>{convertTimestamp(time)}</span>
        </div>
        <DefaultButton onClick={setToggle} danger>
          OK
        </DefaultButton>
      </div>
    </Modal>
  );
};

export default EmplDetail;
