import React, { memo } from 'react';

import SideBar from 'components/SideBar';
import Header from 'components/Header/Layout';

import './style.scss';

const Default = ({ children }) => {
  return (
    <div className='page-layout'>
      <SideBar />
      <div className='page-layout__right'>
        <Header title='Contacts' notifyFree>
          <button>Button</button>
        </Header>
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
