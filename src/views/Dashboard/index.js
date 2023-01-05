import React from 'react';
import { toast } from 'react-toastify';

import { signOutUser } from 'global/redux/auth/request';

const Dashboard = () => {
  const handleClick = async () => {
    signOutUser();
    toast.success('Test success toast !');
  };

  return (
    <div className='page'>
      <button onClick={handleClick}>SignOut</button>
    </div>
  );
};

export default Dashboard;
