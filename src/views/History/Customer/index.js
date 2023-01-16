import React, { useState } from 'react';
import classNames from 'classnames';

import './style.scss';
import ReceiveTable from './RecvTable';
import TransferTable from './TransferTable';
import DebtTable from './DebtTable';

const RECEIVE_TAB = 'RECEIVE_TAB';
const TRANSFER_TAB = 'TRANSFER_TAB';
const DEBT_REPAY_TAB = 'DEBT_REPAY_TAB';

const tables = {
  RECEIVE_TAB: <ReceiveTable />,
  TRANSFER_TAB: <TransferTable />,
  DEBT_REPAY_TAB: <DebtTable />,
};

const CustomerHistory = () => {
  const [activeTab, setActiveTab] = useState(RECEIVE_TAB);

  return (
    <div className='customer-history-view'>
      <div className='customer-history-view-tabs'>
        <span
          className={classNames({ active: activeTab === RECEIVE_TAB })}
          onClick={() => setActiveTab(RECEIVE_TAB)}
          role='tab'
          tabIndex={0}
        >
          Receive
        </span>
        <span
          className={classNames({ active: activeTab === TRANSFER_TAB })}
          onClick={() => setActiveTab(TRANSFER_TAB)}
          role='tab'
          tabIndex={0}
        >
          Transfer
        </span>
        <span
          className={classNames({ active: activeTab === DEBT_REPAY_TAB })}
          onClick={() => setActiveTab(DEBT_REPAY_TAB)}
          role='tab'
          tabIndex={0}
        >
          Debt repaying
        </span>
      </div>
      <div className='customer-history-view-tables'>{tables[activeTab]}</div>
    </div>
  );
};

export default CustomerHistory;
