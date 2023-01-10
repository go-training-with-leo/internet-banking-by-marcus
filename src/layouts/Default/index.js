import React, { memo } from 'react';

import IconButton from 'components/Button/Icon';
import Header from 'navigators/Header';
import SideBar from 'navigators/SideBar';

import RoleRoute from 'core/RoleRoute';
import routes from 'navigators/routes';
import { PlusIcon } from 'assets/images';
import { Route, Routes } from 'react-router-dom';
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
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                element={
                  <RoleRoute roles={route.roles}>{route.element}</RoleRoute>
                }
              />
            ))}
          </Routes>
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
