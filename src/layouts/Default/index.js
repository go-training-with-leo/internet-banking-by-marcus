import React, { cloneElement, isValidElement, memo } from 'react';

import Header from 'navigators/Header';
import SideBar from 'navigators/SideBar';

import SideBarItem from 'navigators/SideBar/Item';
import { getLocalStorage } from 'utils/helpers';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  sideBarItems as sideBarByRole,
  bottomSideBarItem,
} from './sideBarItems';

import './style.scss';
import headerItems from './headerItems';

const DefaultLayout = () => {
  const userRole = getLocalStorage('role') || 'NO_ROLE';

  const { pathname } = useLocation();

  const sideBarItems = {
    items: sideBarByRole[userRole],
    bottomItem: bottomSideBarItem[userRole],
  };

  console.warn(userRole);

  const { titleHeader, button: btnHeader } =
    headerItems[userRole].find(({ path }) => path === pathname) || {};

  const handleClick = () => {
    console.warn('click');
  };

  return (
    <div>
      <div className='page-layout'>
        <SideBar
          bottomItem={
            <Link
              reloadDocument={false}
              to={sideBarItems?.bottomItem?.navigateTo}
            >
              <SideBarItem
                onClick={sideBarItems?.bottomItem?.onClick}
                isActive={pathname === sideBarItems?.bottomItem?.navigateTo}
              >
                {sideBarItems?.bottomItem?.icon}
                {sideBarItems?.bottomItem?.label}
              </SideBarItem>
            </Link>
          }
        >
          {sideBarItems?.items?.map(({ id, icon, label, navigateTo }) => {
            return (
              <Link reloadDocument={false} to={navigateTo} key={id}>
                <SideBarItem isActive={pathname === navigateTo}>
                  {icon}
                  {label}
                </SideBarItem>
              </Link>
            );
          })}
        </SideBar>
        <div className='page-layout__right'>
          <Header title={titleHeader}>
            {isValidElement(btnHeader) &&
              cloneElement(btnHeader, { onClick: handleClick })}
          </Header>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

DefaultLayout.whyDidYouRender = {
  logOnDifferentValues: true,
  customName: 'Layout',
};

export default memo(DefaultLayout);
