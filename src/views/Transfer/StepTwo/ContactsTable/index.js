import React, { useEffect } from 'react';

import Table, { TableRow } from 'components/Table';
import RowCell from 'components/Table/RowCell';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateTransferInfo } from 'global/redux/transfer/slice';
import { selectAuth, selectContact } from 'core/selectors';
import { getContacts } from 'global/redux/contact/thunk';

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

  const handleClick = (contact) => {
    const { id: contactId, contactName, cardNumber, bank } = contact;
    dispatch(
      updateTransferInfo({
        dest: {
          contactId,
          contactName,
          cardNumber,
          bank,
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
    <div className='step-two-table'>
      {contacts?.length > 0 ? (
        <Table widths={[25, 46, 25]} headerTable={headerTable}>
          {contacts.map((row) => (
            <TableRow key={row.id} onClick={() => handleClick(row)}>
              <RowCell title='name'>{row?.contactName}</RowCell>
              <RowCell title='cardNumber'>{row?.cardNumber}</RowCell>
              <RowCell title='bank'>{row?.bank}</RowCell>
            </TableRow>
          ))}
        </Table>
      ) : (
        <span>No contact</span>
      )}
    </div>
  );
};

export default ContactsTable;
