import React from 'react';

import Table, { TableRow } from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import useToggle from 'components/hooks/useToggle';
import RowCell from 'components/Table/RowCell';
import { Edit, Info } from 'assets/images';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import tempData from './tempData';

import './style.scss';

const Contacts = () => {
  const [isShownEdit, toggleEdit] = useToggle();
  const [isShownDelete, toggleDelete] = useToggle();

  const headerTable = (
    <HeaderTable>
      <HeaderCell> </HeaderCell>
      <HeaderCell>Name</HeaderCell>
      <HeaderCell>Card number</HeaderCell>
      <HeaderCell>Bank</HeaderCell>
      <HeaderCell>Actions</HeaderCell>
    </HeaderTable>
  );

  return (
    <div className='contacts-view'>
      <div className='contacts-table'>
        <Table widths={[10, 25, 25, 25, 10]} headerTable={headerTable}>
          {tempData.map((row, index) => {
            return (
              <TableRow key={row?.id}>
                <RowCell>{index + 1}</RowCell>
                <RowCell>{row?.name}</RowCell>
                <RowCell>{row?.cardNumber}</RowCell>
                <RowCell>{row?.bank}</RowCell>
                <RowCell>
                  <Edit
                    fill='red'
                    width={20}
                    height={20}
                    onClick={toggleEdit}
                  />
                  <Info
                    fill='red'
                    width={20}
                    height={20}
                    onClick={toggleDelete}
                  />
                </RowCell>
              </TableRow>
            );
          })}
        </Table>
      </div>
      {isShownEdit && <EditModal setToggle={toggleEdit} />}
      {isShownDelete && <DeleteModal setToggle={toggleDelete} />}
    </div>
  );
};

export default Contacts;
