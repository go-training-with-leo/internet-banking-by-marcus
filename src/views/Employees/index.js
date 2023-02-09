import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

import Input from 'components/Input';
import Table, { TableRow } from 'components/Table';
import IconButton from 'components/Button/Icon';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import Loader from 'components/Loader';
import useToggle from 'components/hooks/useToggle';
import { Info, Search } from 'assets/images';
import { selectAccount, selectAuth } from 'core/selectors';
import { getEmplAccounts } from 'global/redux/account/thunk';
import { formatPhoneVN } from 'utils/helpers';
import EmplDetail from './EmplDetail';

import './style.scss';

const Employees = () => {
  const dispatch = useDispatch();

  const { control, getValues } = useForm();
  const { accounts, isLoading } = useSelector(selectAccount);
  const { currentUser } = useSelector(selectAuth);

  const [showDetail, setShowDetail] = useToggle();
  const [emplAccounts, setEmplAccounts] = useState([]);
  const [emplAccount, setEmplAccount] = useState({});

  const headerTable = (
    <HeaderTable>
      <HeaderCell> </HeaderCell>
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
    setEmplAccounts(filteredAccounts);
  };

  const handleShowDetail = (empl) => {
    setEmplAccount(empl);
    setShowDetail();
  };

  useEffect(() => {
    dispatch(getEmplAccounts());
  }, [currentUser]);

  useEffect(() => {
    setEmplAccounts(accounts);
  }, [accounts]);

  return !isLoading ? (
    <div className='employees-view'>
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
                    setEmplAccounts(accounts);
                  }
                  onChange(val);
                }}
                label='Email / ID'
                placeholder='Enter email or Employee ID'
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
      <div className='employees-table'>
        <Table widths={[10, 25, 25, 25, 25]} headerTable={headerTable}>
          {emplAccounts.map((employee, index) => (
            <TableRow key={employee?.createdAt?.seconds}>
              <RowCell>{index + 1}</RowCell>
              <RowCell>{employee?.accountName}</RowCell>
              <RowCell>{formatPhoneVN(employee?.phoneNumber)}</RowCell>
              <RowCell>{employee?.email}</RowCell>
              <RowCell>
                <Info
                  width={30}
                  height={30}
                  fill='red'
                  onClick={() => handleShowDetail(employee)}
                />
              </RowCell>
            </TableRow>
          ))}
        </Table>
      </div>
      {showDetail && (
        <EmplDetail emplDetail={emplAccount} setToggle={setShowDetail} />
      )}
    </div>
  ) : (
    <Loader large />
  );
};

export default Employees;
