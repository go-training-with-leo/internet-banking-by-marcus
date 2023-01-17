import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from 'components/Input';
import Table, { TableRow } from 'components/Table';
import IconButton from 'components/Button/Icon';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { selectAccount } from 'core/selectors';
import { CashAdd, Info, Search } from 'assets/images';
import { getCustomerAccounts } from 'global/redux/account/thunk';

import './style.scss';

const Accounts = () => {
  const dispatch = useDispatch();

  const [accountInfo, setAccountInfo] = useState([]);

  const { accounts } = useSelector(selectAccount);

  const headerTable = (
    <HeaderTable>
      <HeaderCell>Account</HeaderCell>
      <HeaderCell>Phone</HeaderCell>
      <HeaderCell>Email</HeaderCell>
      <HeaderCell>Actions</HeaderCell>
    </HeaderTable>
  );

  useEffect(() => {
    dispatch(getCustomerAccounts());
  }, []);

  useEffect(() => {
    setAccountInfo(accounts);
  }, [accounts]);

  return (
    <div className='accounts-view'>
      <div className='search-bar'>
        <div className='search-bar__input'>
          <Input
            name='email'
            label='Email / Card number'
            placeholder='Enter email or card number'
          />
        </div>
        <div className='search-bar__btn'>
          <IconButton danger>
            <Search width={20} height={20} fill='white' />
          </IconButton>
        </div>
      </div>
      <div className='accounts-table'>
        <Table widths={[25, 25, 25, 25]} headerTable={headerTable}>
          {accountInfo.map(({ id, accountName, phoneNumber, email }, index) => (
            <TableRow key={id}>
              <RowCell>{index + 1}</RowCell>
              <RowCell title='accountName'>{accountName}</RowCell>
              <RowCell title='phoneNumber'>{phoneNumber}</RowCell>
              <RowCell title='email'>{email}</RowCell>
              <RowCell title='actions'>
                <CashAdd width={30} height={30} fill='red' />
                <Info width={30} height={30} fill='red' />
              </RowCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default Accounts;
