import React from 'react';

import DefaultButton from 'components/Button/Default';
import { signOut } from 'global/redux/auth/request';
import { useDispatch } from 'react-redux';
import { resetContact } from 'global/redux/contact/slice';

const Account = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(resetContact());
    signOut();
  };

  return (
    <div>
      <DefaultButton danger onClick={handleSignOut}>
        Log Out
      </DefaultButton>
    </div>
  );
};

export default Account;
