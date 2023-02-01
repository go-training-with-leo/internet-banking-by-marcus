import React, { useEffect } from 'react';

import DefaultButton from 'components/Button/Default';
import useToggle from 'components/hooks/useToggle';
import { logOut } from 'global/redux/auth/thunk';
import { selectAccount, selectAuth } from 'core/selectors';
import { formatPhoneVN } from 'utils/helpers';
import { getCustAccount } from 'global/redux/account/thunk';
import { useDispatch, useSelector } from 'react-redux';
import ChangePasswordModal from './ChangePwdModal';

import './style.scss';

const Account = () => {
  const dispatch = useDispatch();

  const [changePwdModal, setChangePwdModal] = useToggle();

  const { currentUser } = useSelector(selectAuth);
  const {
    currentAccount,
    isFetched,
    isLoading: loading,
  } = useSelector(selectAccount);

  const handleSignOut = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    if (!isFetched) {
      dispatch(getCustAccount({ email: currentUser?.email }));
    }
  }, [currentUser]);

  return (
    <div className='account-view'>
      <div className='account-view-row'>
        <span className='title'>Name:</span>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <span>{currentAccount?.accountName}</span>
        )}
      </div>
      <div className='account-view-row'>
        <span className='title'>Phone:</span>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <span>{formatPhoneVN(currentAccount?.phoneNumber)}</span>
        )}
      </div>
      <div className='account-view-row'>
        <span className='title'>Email:</span>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <span>{currentAccount?.email}</span>
        )}
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
