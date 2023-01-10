import React, { memo } from 'react';

import IconButton from 'components/Button/Icon';
import Header from 'navigators/Header';
import SideBar from 'navigators/SideBar';

import { PlusIcon } from 'assets/images';
import { Outlet } from 'react-router-dom';
import { signOut } from 'global/redux/auth/request';

import './style.scss';

const DefaultLayout = () => {
  return (
    <div>
      <div className='page-layout'>
        <SideBar />
        <div className='page-layout__right'>
          <Header title='Contacts' notifyFree>
            <IconButton onClick={() => signOut()}>
              Button <PlusIcon fill='red' />
            </IconButton>
          </Header>
          <Outlet />
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
