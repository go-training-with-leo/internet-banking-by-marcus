import React, { memo } from 'react';

import IconButton from 'components/Button/Icon';
import Header from 'navigators/Header';
import SideBar from 'navigators/SideBar';

import SideBarItem from 'navigators/SideBar/Item';
import routes from 'navigators/routes';
import { PlusIcon } from 'assets/images';
import { getLocalStorage } from 'utils/helpers';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  sideBarItems as sideBarByRole,
  bottomSideBarItem,
} from './sideBarItems';

import './style.scss';

const DefaultLayout = () => {
  const userRole = getLocalStorage('role');

  const { pathname } = useLocation();
  const sideBarItems = {
    items: sideBarByRole[userRole],
    bottomItem: bottomSideBarItem[userRole],
  };

  const { title: titleHeader } = routes.find(
    (route) => route.path === pathname
  );

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
          {sideBarItems.items.map(({ id, icon, label, navigateTo }) => {
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
            <IconButton>
              New account <PlusIcon fill='red' />
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
