import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Input from 'components/Input';
import Table, { TableRow } from 'components/Table';
import IconButton from 'components/Button/Icon';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { Search } from 'assets/images';
import tempData from './tempData';

import './style.scss';

const EmployeeHistory = () => {
  const navigate = useNavigate();

  const { register } = useForm();

  const headerTable = (
    <HeaderTable>
      <HeaderCell>Account</HeaderCell>
      <HeaderCell>Phone</HeaderCell>
      <HeaderCell>Email</HeaderCell>
    </HeaderTable>
  );

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
          <IconButton danger>
            <Search width={20} height={20} fill='white' />
          </IconButton>
        </div>
      </div>
      <span>Account:</span>
      <div className='empl-history-table'>
        <Table widths={[25, 25, 25, 25]} headerTable={headerTable}>
          {tempData.map(({ id, account, phone, email }, index) => (
            <TableRow
              key={id}
              onClick={() => navigate(`/employee/history/${id}`)}
            >
              <RowCell>{index + 1}</RowCell>
              <RowCell title='account'>{account}</RowCell>
              <RowCell title='phone'>{phone}</RowCell>
              <RowCell title='email'>{email}</RowCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default EmployeeHistory;
