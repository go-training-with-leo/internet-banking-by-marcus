import classNames from 'classnames';
import React, { useState } from 'react';

import YouTable from './YouTable';

import './style.scss';
import OtherTable from './OtherTable';

const CREATE_BY_YOU = 'CREATE_BY_YOU';
const RECV_FROM_OTHERS = 'RECV_FROM_OTHERS';

const Debts = () => {
  const [activeTab, setActiveTab] = useState(CREATE_BY_YOU);

  return (
    <div className='debt-view'>
      <div className='debt-view-tabs'>
        <span
          className={classNames({ active: activeTab === CREATE_BY_YOU })}
          onClick={() => setActiveTab(CREATE_BY_YOU)}
          role='tab'
          tabIndex={0}
        >
          Created by you
        </span>
        <span
          className={classNames({ active: activeTab === RECV_FROM_OTHERS })}
          onClick={() => setActiveTab(RECV_FROM_OTHERS)}
          role='tab'
          tabIndex={0}
        >
          Received from others
        </span>
      </div>
      <div className='debt-tables'>
        {activeTab === CREATE_BY_YOU && <YouTable />}
        {activeTab === RECV_FROM_OTHERS && <OtherTable />}
      </div>
    </div>
  );
};

export default Debts;
