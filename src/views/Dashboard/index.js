import React from 'react';
import { toast } from 'react-toastify';

import { signOut } from 'global/redux/auth/request';

const Dashboard = () => {
  const handleClick = async () => {
    signOut();
    toast.success('Test success toast !');
  };

  return (
    <div className='page'>
      <button onClick={handleClick}>SignOut</button>
    </div>
  );
};

export default Dashboard;
