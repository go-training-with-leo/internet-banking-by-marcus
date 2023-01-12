import React from 'react';

import DefaultButton from 'components/Button/Default';
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
