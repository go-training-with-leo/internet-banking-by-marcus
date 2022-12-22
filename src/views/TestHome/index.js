import React, { useState } from 'react';
import { toast } from 'react-toastify';

import authentication from 'global/redux/auth/request';

const TestHome = () => {
  const handleClick = async () => {
    authentication.signOut();
    toast.success('Test success toast !');
  };

  const [count, setCount] = useState(0);
  console.warn(count);
  return (
    <div className='page'>
      <button onClick={() => setCount((prev) => prev + 1)}>click</button>
      <button onClick={handleClick}>SignOut</button>
    </div>
  );
};

export default TestHome;
