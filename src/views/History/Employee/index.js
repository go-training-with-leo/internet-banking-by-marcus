import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Input from 'components/Input';
import Table, { TableRow } from 'components/Table';
import IconButton from 'components/Button/Icon';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { selectAccount, selectAuth } from 'core/selectors';
import { Search } from 'assets/images';

import './style.scss';
import { getCustomerAccounts } from 'global/redux/account/thunk';
import { formatPhoneVN } from 'utils/helpers';

const EmployeeHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountInfo, setAccountInfo] = useState([]);

  const { currentUser } = useSelector(selectAuth);
  const { getValues, control } = useForm();

  const { accounts, isFetched } = useSelector(selectAccount);

  const headerTable = (
    <HeaderTable>
      <HeaderCell> </HeaderCell>
      <HeaderCell>Account</HeaderCell>
      <HeaderCell>Phone</HeaderCell>
      <HeaderCell>Email</HeaderCell>
    </HeaderTable>
  );

  const handleFilter = () => {
    const inputValue = getValues('email');
    const filteredAccounts = accounts.filter((account) => {
      return account?.email.toLowerCase().includes(inputValue?.toLowerCase());
    });
    setAccountInfo(filteredAccounts);
  };

  useEffect(() => {
    if (!isFetched) {
      dispatch(getCustomerAccounts({ email: currentUser?.email }));
    }
  }, [isFetched]);

  useEffect(() => {
    setAccountInfo(accounts);
  }, [accounts]);

  return (
    <div className='empl-history-view'>
      <div className='search-bar'>
        <div className='search-bar__input'>
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value } }) => (
              <Input
                name='email'
                value={value}
                onChange={(val) => {
                  if (val.target.value === '') {
                    setAccountInfo(accounts);
                  }
                  onChange(val);
                }}
                label='Email / Card number'
                placeholder='Enter email'
              />
            )}
          />
        </div>
        <div className='search-bar__btn'>
          <IconButton danger onClick={handleFilter}>
            <Search width={20} height={20} fill='white' />
          </IconButton>
        </div>
      </div>
      <span>Account:</span>
      <div className='empl-history-table'>
        <Table widths={[5, 35, 25, 25, 25]} headerTable={headerTable}>
          {accountInfo?.map((customer, index) => (
            <TableRow
              key={customer?.id}
              onClick={() => navigate(`/employee/history/${customer?.id}`)}
              isHover
            >
              <RowCell>{index + 1}</RowCell>
              <RowCell title='account'>{customer?.accountName}</RowCell>
              <RowCell title='phone'>
                {formatPhoneVN(customer?.phoneNumber)}
              </RowCell>
              <RowCell title='email'>{customer?.email}</RowCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default EmployeeHistory;
