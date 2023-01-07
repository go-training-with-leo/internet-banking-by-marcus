import React, { memo } from 'react';

import IconButton from 'components/Button/Icon';
import Header from 'components/Header/Layout';
import SideBar from 'components/SideBar';

import './style.scss';
import { PlusIcon } from 'assets/images';

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <div className='page-layout'>
        <SideBar />
        <div className='page-layout__right'>
          <Header title='Contacts' notifyFree>
            <IconButton>
              Button <PlusIcon fill='red' />
            </IconButton>
          </Header>
          {children}
        </div>
      </div>
    </div>
  );
};

DefaultLayout.whyDidYouRender = {
  logOnDifferentValues: true,
  customName: 'Menu',
};

export default memo(DefaultLayout);
