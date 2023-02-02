import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Input from 'components/Input';
import Table, { TableRow } from 'components/Table';
import IconButton from 'components/Button/Icon';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { selectAccount } from 'core/selectors';
import { Search } from 'assets/images';

import './style.scss';
import { getCustomerAccounts } from 'global/redux/account/thunk';

const EmployeeHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountInfo, setAccountInfo] = useState([]);

  const { register, getValues, watch } = useForm();
  const watchInput = watch('email');

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
      return account?.email.toLowerCase().includes(inputValue);
    });
    setAccountInfo(filteredAccounts);
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
    <div className='empl-history-view'>
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
      <span>Account:</span>
      <div className='empl-history-table'>
        <Table widths={[25, 25, 25, 25]} headerTable={headerTable}>
          {accountInfo?.map((customer, index) => (
            <TableRow
              key={customer?.id}
              onClick={() => navigate(`/employee/history/${customer?.id}`)}
            >
              <RowCell>{index + 1}</RowCell>
              <RowCell title='account'>{customer?.accountName}</RowCell>
              <RowCell title='phone'>{customer?.phoneNumber}</RowCell>
              <RowCell title='email'>{customer?.email}</RowCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default EmployeeHistory;
