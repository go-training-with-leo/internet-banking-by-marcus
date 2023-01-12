import DefaultButton from 'components/Button/Default';
import React from 'react';

import { signOut } from 'global/redux/auth/request';

const Account = () => {
  return (
    <div>
      <DefaultButton danger onClick={() => signOut()}>
        Log Out
      </DefaultButton>
    </div>
  );
};

export default Account;
