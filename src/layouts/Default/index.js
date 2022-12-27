import React, { memo } from 'react';

import Header from 'components/Header';
import SideBar from 'components/SideBar';

import 'layouts/Default/style.scss';

const Default = ({ children }) => {
  return (
    <div className='page-layout'>
      <SideBar />
      <div className='page-layout__right'>
        <Header />
        {children}
      </div>
    </div>
  );
};

Default.whyDidYouRender = {
  logOnDifferentValues: true,
  customName: 'Menu',
};

export default memo(Default);
