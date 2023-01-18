import React from 'react';

import DefaultButton from 'components/Button/Default';
import { signOut } from 'global/redux/auth/request';
import { useDispatch } from 'react-redux';
import { resetCards } from 'global/redux/card/slice';

const Account = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut();
    dispatch(resetCards());
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
