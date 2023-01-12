import React from 'react';
import { useForm } from 'react-hook-form';

import Input from 'components/Input';
import Table, { TableRow } from 'components/Table';
import IconButton from 'components/Button/Icon';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { CashAdd, Info, Search } from 'assets/images';
import tempData from './tempData';

import './style.scss';

const Employees = () => {
  const { register } = useForm();

  const headerTable = (
    <HeaderTable>
      <HeaderCell key='account'>Account</HeaderCell>
      <HeaderCell key='phone'>Phone</HeaderCell>
      <HeaderCell key='email'>Email</HeaderCell>
      <HeaderCell key='actions'>Actions</HeaderCell>
    </HeaderTable>
  );

  return (
    <div className='employees-view'>
      <div className='search-bar'>
        <div className='search-bar__input'>
          <Input
            register={register}
            name='email'
            label='Email or ID'
            placeholder='Enter email or ID'
          />
        </div>
        <div className='search-bar__btn'>
          <IconButton danger>
            <Search width={20} height={20} fill='white' />
          </IconButton>
        </div>
      </div>
      <div className='employees-table'>
        <Table widths={[25, 25, 25, 25]} headerTable={headerTable}>
          {tempData.map((row, index) => (
            <TableRow key={row?.id}>
              <RowCell>{index + 1}</RowCell>
              <RowCell>{row?.account}</RowCell>
              <RowCell>{row?.phone}</RowCell>
              <RowCell>{row?.email}</RowCell>
              <RowCell>
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

export default Employees;
