import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import { deleteContact } from 'global/redux/contact/thunk';
import { selectContact } from 'core/selectors';

import './style.scss';
import { useTranslation } from 'react-i18next';

const DeleteModal = ({ setToggle, contactData }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation('translation', { keyPrefix: 'Pages.Contacts' });
  const { isLoading: loading } = useSelector(selectContact);

  const handleConfirm = async () => {
    const {
      payload: { status },
    } = await dispatch(deleteContact({ id: contactData.id }));

    if (status) {
      setToggle();
    }
  };

  return (
    <Modal setToggle={setToggle} title={t('alert')} clickOutSide cancel>
      <div className='delete-modal'>
        <span className='confirm-text'>{t('alertDesc')}</span>
        <div className='btns-group'>
          <div className='btn'>
            <DefaultButton loading={loading} onClick={handleConfirm} danger>
              {t('confirm')}
            </DefaultButton>
          </div>
          <div className='btn'>
            <DefaultButton onClick={setToggle}>{t('cancel')}</DefaultButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
