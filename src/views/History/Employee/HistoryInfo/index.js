import classNames from 'classnames';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loader from 'components/Loader';
import { Back } from 'assets/images';

import './style.scss';
import { useSelector } from 'react-redux';
import { selectAccount } from 'core/selectors';

const ReceiveTab = lazy(() => import('./ReceiveTab'));
const TransferTab = lazy(() => import('./TransferTab'));
const DebtRepayTab = lazy(() => import('./DebtRepayTab'));

const TAB_RECEIVE = 'TAB_RECEIVE';
const TAB_TRANSFER = 'TAB_TRANSFER';
const TAB_DEBT_REPAY = 'TAB_DEBT_REPAY';

const HistoryInfo = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { accounts } = useSelector(selectAccount);

  const [activeTab, setActiveTab] = useState(TAB_RECEIVE);
  const [customer, setCustomer] = useState({});

  const tabs = {
    TAB_RECEIVE: <ReceiveTab customer={customer} />,
    TAB_TRANSFER: <TransferTab customer={customer} />,
    TAB_DEBT_REPAY: <DebtRepayTab customer={customer} />,
  };

  useEffect(() => {
    const customerData = accounts.find((account) => account.id === id);
    setCustomer(customerData);
  }, [id]);

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
        <span>
          {customer?.accountName} / {customer?.cardNumber} / EIGHT.Bank
        </span>
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
