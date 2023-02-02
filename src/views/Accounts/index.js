import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from 'components/Input';
import Table, { TableRow } from 'components/Table';
import useToggle from 'components/hooks/useToggle';
import IconButton from 'components/Button/Icon';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { selectAccount } from 'core/selectors';
import { CashAdd, Info, Search } from 'assets/images';
import { getCustomerAccounts } from 'global/redux/account/thunk';

import './style.scss';
import { useForm } from 'react-hook-form';
import AccountInfoModal from './AccountInfoModal';
import RechargeModal from './RechargeModal';

const Accounts = () => {
  const dispatch = useDispatch();

  const [showRecharge, setShowRecharge] = useToggle();
  const [showDetail, setShowDetail] = useToggle();
  const [actionData, setActionData] = useState();
  const [accountInfo, setAccountInfo] = useState([]);

  const { accounts, isFetched } = useSelector(selectAccount);
  const { register, getValues, watch } = useForm();

  const watchInput = watch('email');

  const headerTable = (
    <HeaderTable>
      <HeaderCell>Account</HeaderCell>
      <HeaderCell>Phone</HeaderCell>
      <HeaderCell>Email</HeaderCell>
      <HeaderCell>Actions</HeaderCell>
    </HeaderTable>
  );

  const handleFilter = () => {
    const inputValue = getValues('email');
    const filteredAccounts = accounts.filter((account) => {
      return account?.email.toLowerCase().includes(inputValue);
    });
    setAccountInfo(filteredAccounts);
  };

  const handleShowDetail = ({ type, accountDetail }) => {
    setActionData(accountDetail);
    if (type === 'RECHARGE') setShowRecharge();
    else if (type === 'DETAIL') setShowDetail();
  };

  useEffect(() => {
    if (!isFetched) {
      dispatch(getCustomerAccounts());
    }
  }, [isFetched]);

  useEffect(() => {
    setAccountInfo(accounts);
  }, [accounts]);

  useEffect(() => {
    if (watchInput === '') {
      setAccountInfo(accounts);
    }
  }, [watchInput]);

  return (
    <div className='accounts-view'>
      <div className='search-bar'>
        <div className='search-bar__input'>
          <Input
            register={register}
            name='email'
            label='Email / Card number'
            placeholder='Enter email or card number'
          />
        </div>
        <div className='search-bar__btn'>
          <IconButton danger onClick={handleFilter}>
            <Search width={20} height={20} fill='white' />
          </IconButton>
        </div>
      </div>
      <div className='accounts-table'>
        {accountInfo ? (
          <Table widths={[25, 25, 25, 25]} headerTable={headerTable}>
            {accountInfo?.map((customer, index) => (
              <TableRow key={customer.id}>
                <RowCell>{index + 1}</RowCell>
                <RowCell title='accountName'>{customer.accountName}</RowCell>
                <RowCell title='phoneNumber'>{customer.phoneNumber}</RowCell>
                <RowCell title='email'>{customer.email}</RowCell>
                <RowCell title='actions'>
                  <CashAdd
                    width={30}
                    height={30}
                    fill='red'
                    onClick={() =>
                      handleShowDetail({
                        type: 'RECHARGE',
                        accountDetail: customer,
                      })
                    }
                  />
                  <Info
                    width={30}
                    height={30}
                    onClick={() =>
                      handleShowDetail({
                        type: 'DETAIL',
                        accountDetail: customer,
                      })
                    }
                    fill='red'
                  />
                </RowCell>
              </TableRow>
            ))}
          </Table>
        ) : (
          <span>No account</span>
        )}
      </div>
      {showDetail && (
        <AccountInfoModal
          setToggle={setShowDetail}
          accountDetail={actionData}
        />
      )}
      {showRecharge && (
        <RechargeModal setToggle={setShowRecharge} accountDetail={actionData} />
      )}
    </div>
  );
};

export default Accounts;
