import React from 'react';

import Table from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import useToggle from 'components/hooks/useToggle';
import { DeleteIcon, Edit } from 'assets/images';
import EditModal from './EditModal';
import tempData from './tempData';

import './style.scss';
import DeleteModal from './DeleteModal';

const Contacts = () => {
  const [isShownEdit, toggleEdit] = useToggle();
  const [isShownDelete, toggleDelete] = useToggle();

  const headerTable = (
    <HeaderTable>
      <HeaderCell key='name'>Name</HeaderCell>
      <HeaderCell key='cardNumber'>Card number</HeaderCell>
      <HeaderCell key='bank'>Bank</HeaderCell>
      <HeaderCell key='actions'>Actions</HeaderCell>
    </HeaderTable>
  );

  return (
    <div className='contacts-view'>
      <div className='contacts-table'>
        <Table
          widths={[25, 25, 25, 25]}
          headerTable={headerTable}
          dataTable={tempData}
        >
          <RowCell title='name' />
          <RowCell title='cardNumber' />
          <RowCell title='bank' />
          <RowCell title='actions'>
            <Edit width={20} height={20} fill='red' onClick={toggleEdit} />
            <DeleteIcon
              width={20}
              height={20}
              fill='red'
              onClick={toggleDelete}
            />
          </RowCell>
        </Table>
      </div>
      {isShownEdit && <EditModal setToggle={toggleEdit} />}
      {isShownDelete && <DeleteModal setToggle={toggleDelete} />}
    </div>
  );
};

export default Contacts;
