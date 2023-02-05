import { Search } from 'assets/images';
import IconButton from 'components/Button/Icon';
import useToggle from 'components/hooks/useToggle';
import Input from 'components/Input';
import Loader from 'components/Loader';
import Table, { TableRow } from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { selectAccount, selectAuth } from 'core/selectors';
import { getCustomerAccounts } from 'global/redux/account/thunk';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import DetailModal from './DetailModal';

import './style.scss';

const AdminHistory = () => {
  const dispatch = useDispatch();

  const [accountInfo, setAccountInfo] = useState([]);
  const [customerDetail, setCustomerDetail] = useState({});
  const [showModal, setShowModal] = useToggle();

  const { control, getValues } = useForm();
  const { currentUser } = useSelector(selectAuth);
  const { accounts, isLoading } = useSelector(selectAccount);

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

  const handleShowDetail = (customer) => {
    setCustomerDetail(customer);
    setShowModal();
  };

  useEffect(() => {
    dispatch(getCustomerAccounts({ email: currentUser?.email }));
  }, [currentUser]);

  useEffect(() => {
    setAccountInfo(accounts);
  }, [accounts]);

  return !isLoading ? (
    <div className='admin-history-view'>
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
                placeholder='Enter email or card number'
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
      <span>Account: </span>
      <div className='empl-history-table'>
        <Table widths={[25, 25, 25, 25]} headerTable={headerTable}>
          {accountInfo?.map((customer, index) => (
            <TableRow
              key={customer?.id}
              onClick={() => handleShowDetail(customer)}
              isHover
            >
              <RowCell>{index + 1}</RowCell>
              <RowCell title='account'>{customer?.accountName}</RowCell>
              <RowCell title='phone'>{customer?.phoneNumber}</RowCell>
              <RowCell title='email'>{customer?.email}</RowCell>
            </TableRow>
          ))}
        </Table>
      </div>
      {showModal && (
        <DetailModal customerDetail={customerDetail} setToggle={setShowModal} />
      )}
    </div>
  ) : (
    <Loader large />
  );
};

export default AdminHistory;
