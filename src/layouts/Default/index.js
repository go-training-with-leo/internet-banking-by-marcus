import React, { memo } from 'react';

import IconButton from 'components/Button/Icon';
import Header from 'components/Header/Layout';
import SideBar from 'components/SideBar';
import routes from 'routes';

import { PlusIcon } from 'assets/images';
import { Route, Routes } from 'react-router-dom';

import './style.scss';

const DefaultLayout = () => {
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
          <Routes>
            {routes.map((route) => (
              <Route key={route.id} path={route.path} element={route.element} />
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
