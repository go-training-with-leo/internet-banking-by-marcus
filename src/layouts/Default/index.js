import React from 'react';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

import 'layouts/Default/style.scss';

const Default = ({ children }) => {
  console.warn('rerender');
  return (
    <div className='page-layout'>
      <Sidebar />
      <div className='page-layout__right'>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Default;
