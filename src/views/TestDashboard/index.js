import React from 'react';
import { toast } from 'react-toastify';

import authentication from 'global/redux/auth/request';

const TestDashboard = () => {
  const handleClick = async () => {
    authentication.signOut();
    toast.success('Test success toast !');
  };

  return (
    <div className='page'>
      <button onClick={handleClick}>SignOut</button>
    </div>
  );
};

export default TestDashboard;
