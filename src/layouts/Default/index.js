import { useDispatch, useSelector } from 'react-redux';
import React, { cloneElement, isValidElement, memo, useEffect } from 'react';

import AddDebt from 'views/Debts/AddDebt';
import Header from 'navigators/Header';
import SideBar from 'navigators/SideBar';
import AddContactModal from 'views/Contacts/AddContactModal';
import SideBarItem from 'navigators/SideBar/Item';
import useToggle from 'components/hooks/useToggle';
import AddCustomerModal from 'views/Accounts/AddCustomerModal';
import AddEmplModal from 'views/Employees/AddEmplModal';
import NewSvCard from 'views/Cards/NewSvCard';
import { getLocalStorage } from 'utils/helpers';
import { logOut } from 'global/redux/auth/thunk';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { getAllNotifs } from 'global/redux/notification/thunk';
import { selectNotif } from 'core/selectors';
import headerItems from './headerItems';
import {
  sideBarItems as sideBarByRole,
  bottomSideBarItem,
} from './sideBarItems';

import './style.scss';

const DefaultLayout = () => {
  const dispatch = useDispatch();
  const userRole = getLocalStorage('role') || 'NO_ROLE';

  const [showModal, setShowModal] = useToggle();

  const { pathname } = useLocation();
  const { isFetched } = useSelector(selectNotif);

  const sideBarItems = {
    items: sideBarByRole[userRole],
    bottomItem: bottomSideBarItem[userRole],
  };

  const { titleHeader, button: btnHeader } =
    headerItems[userRole].find(({ path }) => path === pathname) || {};

  const showTitle = () => {
    if (pathname.includes('/employee/history/')) {
      return 'History';
    }
    return titleHeader;
  };

  const handleClick = () => {
    if (userRole === 'ADMIN' || userRole === 'EMPLOYEE') {
      dispatch(logOut());
    }
  };

  useEffect(() => {
    if (!isFetched) {
      dispatch(getAllNotifs());
    }
  }, [isFetched]);

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
                onClick={handleClick}
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
          <Header title={showTitle()} type={userRole === 'CUSTOMER' && 'free'}>
            {isValidElement(btnHeader) &&
              cloneElement(btnHeader, { onClick: setShowModal })}
          </Header>
          <div className='page-layout__right__body'>
            <Outlet />
            {showModal && pathname === '/contacts' && (
              <AddContactModal setToggle={setShowModal} />
            )}
            {showModal && pathname === '/employees' && (
              <AddEmplModal setToggle={setShowModal} />
            )}
            {showModal && pathname === '/accounts' && (
              <AddCustomerModal setToggle={setShowModal} />
            )}
            {showModal && pathname === '/debts' && (
              <AddDebt setToggle={setShowModal} />
            )}
            {showModal && pathname === '/cards' && (
              <NewSvCard setToggle={setShowModal} />
            )}
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
