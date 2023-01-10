import React, { memo } from 'react';

import IconButton from 'components/Button/Icon';
import Header from 'navigators/Header';
import SideBar from 'navigators/SideBar';

import SideBarItem from 'navigators/SideBar/Item';
import { PlusIcon } from 'assets/images';
import { signOut } from 'global/redux/auth/request';
import { getLocalStorage } from 'utils/helpers';
import { Link, Outlet } from 'react-router-dom';
import {
  sideBarItems as sideBarByRole,
  bottomSideBarItem,
} from './sideBarItems';

import './style.scss';

const DefaultLayout = () => {
  const userRole = getLocalStorage('role');

  const sideBarItems = {
    items: sideBarByRole[userRole],
    bottomItem: bottomSideBarItem[userRole],
  };

  return (
    <div>
      <div className='page-layout'>
        <SideBar
          bottomItem={
            <Link
              reloadDocument={false}
              to={sideBarItems.bottomItem?.navigateTo}
            >
              <SideBarItem onClick={sideBarItems.bottomItem?.onClick}>
                {sideBarItems.bottomItem.icon}
                {sideBarItems.bottomItem.label}
              </SideBarItem>
            </Link>
          }
        >
          {sideBarItems.items.map(({ id, icon, label, navigateTo }) => {
            return (
              <Link reloadDocument={false} to={navigateTo} key={id}>
                <SideBarItem>
                  {icon}
                  {label}
                </SideBarItem>
              </Link>
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
