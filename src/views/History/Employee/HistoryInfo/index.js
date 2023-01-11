import classNames from 'classnames';
import React, { lazy, Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loader from 'components/Loader';
import { Back } from 'assets/images';

import './style.scss';

const ReceiveTab = lazy(() => import('./ReceiveTab'));
const TransferTab = lazy(() => import('./TransferTab'));
const DebtRepayTab = lazy(() => import('./DebtRepayTab'));

const TAB_RECEIVE = 'TAB_RECEIVE';
const TAB_TRANSFER = 'TAB_TRANSFER';
const TAB_DEBT_REPAY = 'TAB_DEBT_REPAY';

const tabs = {
  TAB_RECEIVE: <ReceiveTab />,
  TAB_TRANSFER: <TransferTab />,
  TAB_DEBT_REPAY: <DebtRepayTab />,
};

const HistoryInfo = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(TAB_RECEIVE);

  return (
    <div className='history-info-view'>
      <div
        className='navigate-back'
        role='button'
        onClick={() => navigate(-1)}
        tabIndex={0}
      >
        <Back />
        <span>Back to customer filter</span>
      </div>
      <div className='account-info'>
        <span>Account: </span>
        <span>Justin Doe / 5647 4748 9102 8720 / EIGHT.Bank</span>
      </div>
      <div className='tabs'>
        <div
          className={classNames({ active: activeTab === TAB_RECEIVE })}
          onClick={() => setActiveTab(TAB_RECEIVE)}
          role='tab'
          tabIndex={0}
        >
          Receive{' '}
        </div>
        <div
          className={classNames({ active: activeTab === TAB_TRANSFER })}
          onClick={() => setActiveTab(TAB_TRANSFER)}
          role='tab'
          tabIndex={0}
        >
          Transfer
        </div>
        <div
          className={classNames({ active: activeTab === TAB_DEBT_REPAY })}
          onClick={() => setActiveTab(TAB_DEBT_REPAY)}
          role='tab'
          tabIndex={0}
        >
          Debt repaying
        </div>
      </div>
      <div className='history-info-table'>
        <Suspense fallback={<Loader large />}>{tabs[activeTab]}</Suspense>
      </div>
    </div>
  );
};

export default HistoryInfo;
