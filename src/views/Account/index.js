import React from 'react';

import DefaultButton from 'components/Button/Default';
import useToggle from 'components/hooks/useToggle';
import { signOut } from 'global/redux/auth/request';
import { useDispatch } from 'react-redux';
import { resetContact } from 'global/redux/contact/slice';
import ChangePasswordModal from './ChangePwdModal';

import './style.scss';

const Account = () => {
  const dispatch = useDispatch();

  const [changePwdModal, setChangePwdModal] = useToggle();

  const handleSignOut = () => {
    dispatch(resetContact());
    signOut();
  };

  return (
    <div className='account-view'>
      <div className='account-view-row'>
        <span className='title'>Name:</span>
        <span>Justin Doe</span>
      </div>
      <div className='account-view-row'>
        <span className='title'>Phone:</span>
        <span>+84381234567</span>
      </div>
      <div className='account-view-row'>
        <span className='title'>Email:</span>
        <span>email@gmail.com</span>
      </div>
      <div className='account-view-btn'>
        <DefaultButton danger onClick={setChangePwdModal}>
          Change password
        </DefaultButton>
      </div>
      <div className='account-view-btn'>
        <DefaultButton danger onClick={handleSignOut}>
          Log out
        </DefaultButton>
      </div>
      {changePwdModal && <ChangePasswordModal setToggle={setChangePwdModal} />}
    </div>
  );
};

export default Account;
