import React, { cloneElement, isValidElement, memo } from 'react';

import Header from 'navigators/Header';
import SideBar from 'navigators/SideBar';

import SideBarItem from 'navigators/SideBar/Item';
import useToggle from 'components/hooks/useToggle';
import { getLocalStorage } from 'utils/helpers';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AddEmplModal from 'views/Employees/AddEmplModal';
import {
  sideBarItems as sideBarByRole,
  bottomSideBarItem,
} from './sideBarItems';

import headerItems from './headerItems';

import './style.scss';

const DefaultLayout = () => {
  const userRole = getLocalStorage('role') || 'NO_ROLE';

  const [showModal, setShowModal] = useToggle();

  const { pathname } = useLocation();

  const sideBarItems = {
    items: sideBarByRole[userRole],
    bottomItem: bottomSideBarItem[userRole],
  };

  const { titleHeader, button: btnHeader } =
    headerItems[userRole].find(({ path }) => path === pathname) || {};

  // const handleClick = () => {
  //   console.warn('testClick');
  // };

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
          {sideBarItems?.items?.map(
            ({ id, icon, label, navigateTo, isStatic }) => {
              return (
                <Link reloadDocument={false} to={navigateTo} key={id}>
                  <SideBarItem
                    isActive={pathname === navigateTo}
                    isStatic={isStatic}
                  >
                    {icon}
                    {label}
                  </SideBarItem>
                </Link>
              );
            }
          )}
        </SideBar>
        <div className='page-layout__right'>
          <Header title={titleHeader} type={userRole === 'CUSTOMER' && 'free'}>
            {isValidElement(btnHeader) &&
              cloneElement(btnHeader, { onClick: setShowModal })}
          </Header>
          <div className='page-layout__right__body'>
            <Outlet />
            {showModal && <AddEmplModal setToggle={setShowModal} />}
          </div>
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
