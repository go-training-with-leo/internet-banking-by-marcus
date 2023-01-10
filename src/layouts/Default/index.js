import React, { memo, useEffect } from 'react';

import IconButton from 'components/Button/Icon';
import Header from 'navigators/Header';
import SideBar from 'navigators/SideBar';

import { PlusIcon } from 'assets/images';
import { Outlet } from 'react-router-dom';
import { signOut } from 'global/redux/auth/request';

import useMergeState from 'components/hooks/useMergeState';
import SideBarItem from 'navigators/SideBar/Item';
import { getLocalStorage } from 'utils/helpers';
import {
  sideBarItems as sideBarByRole,
  bottomSideBarItem,
} from './sideBarItems';

import './style.scss';

const DefaultLayout = () => {
  const userRole = getLocalStorage('role');

  const [sideBarItems, setSideBarItems] = useMergeState({
    items: [],
    bottomItem: {},
  });

  useEffect(() => {
    setSideBarItems({
      items: sideBarByRole[userRole],
      bottomItem: bottomSideBarItem[userRole],
    });
  }, []);

  return (
    <div>
      <div className='page-layout'>
        <SideBar
          bottomItem={
            <SideBarItem onClick={sideBarItems.bottomItem.onClick}>
              {sideBarItems.bottomItem.icon}
              {sideBarItems.bottomItem.label}
            </SideBarItem>
          }
        >
          {sideBarItems.items.map(({ id, icon, label }) => {
            return (
              <SideBarItem key={id}>
                {icon}
                {label}
              </SideBarItem>
            );
          })}
        </SideBar>
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
