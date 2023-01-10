import { signOut } from 'global/redux/auth/request';
import React from 'react';

const Cards = () => {
  return (
    <div>
      Customer Cards
      <button onClick={() => signOut()}>Card</button>
    </div>
  );
};

export default Cards;
