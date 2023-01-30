import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table, { TableRow } from 'components/Table';
import RowCell from 'components/Table/RowCell';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import { getContacts } from 'global/redux/contact/thunk';
import { updateDebtInfo } from 'global/redux/debt/slice';
import { selectAuth, selectContact } from 'core/selectors';

import './style.scss';

const headerTable = (
  <HeaderTable>
    <HeaderCell>Name</HeaderCell>
    <HeaderCell>Card number</HeaderCell>
    <HeaderCell>Bank</HeaderCell>
  </HeaderTable>
);

const ContactsTable = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector(selectAuth);
  const { contacts, isFetched } = useSelector(selectContact);

  const handleClick = (dest) => {
    const { cardNumber, contactName, id, bank } = dest;

    dispatch(
      updateDebtInfo({
        dest: {
          contactId: id,
          contactName,
          bank,
          cardNumber,
        },
      })
    );
  };

  useEffect(() => {
    if (!isFetched) {
      dispatch(getContacts({ email: currentUser?.email }));
    }
  }, []);

  return (
    <div className='add-debt-table'>
      <Table widths={[25, 46, 25]} headerTable={headerTable}>
        {contacts.map((row) => (
          <TableRow key={row.id} onClick={() => handleClick(row)}>
            <RowCell title='name'>{row?.contactName}</RowCell>
            <RowCell title='cardNumber'>{row?.cardNumber}</RowCell>
            <RowCell title='bank'>{row?.bank}</RowCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
};

export default ContactsTable;
