import React, { memo } from 'react';

import Header from 'components/Header/Layout';
import SideBar from 'components/SideBar';

import 'layouts/Default/style.scss';
import { useSelector } from 'react-redux';

const Default = ({ children }) => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div>
      {currentUser ? (
        <div className='page-layout'>
          <SideBar />
          <div className='page-layout__right'>
            <Header title='Contacts' notifyFree>
              <button>Button</button>
            </Header>
            {children}
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

Default.whyDidYouRender = {
  logOnDifferentValues: true,
  customName: 'Menu',
};

export default memo(Default);
