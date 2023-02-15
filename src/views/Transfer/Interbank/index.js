import React from 'react';

import Modal from 'components/Modal';

import './style.scss';
import { useTranslation } from 'react-i18next';

const InterBank = ({ setToggle }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.Transfer' });

  return (
    <Modal title={t('interbank')} clickOutSide cancel setToggle={setToggle}>
      <div className='coming-soon'>
        <h1>{t('commingSoon')}</h1>
      </div>
    </Modal>
  );
};

export default InterBank;
