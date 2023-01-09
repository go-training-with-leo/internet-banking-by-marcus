import { signOut } from 'global/redux/auth/request';
import React from 'react';

const NotFound = () => {
  return (
    <div className='page-container'>
      <button onClick={() => signOut()}>Not Found</button>
    </div>
  );
};

export default NotFound;
