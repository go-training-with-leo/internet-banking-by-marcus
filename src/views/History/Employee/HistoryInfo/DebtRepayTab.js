import React, { useEffect, useState } from 'react';

import Table, { TableRow } from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { selectHistory } from 'core/selectors';
import { getAllHistories } from 'global/redux/history/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowDown } from 'assets/images';
import { convertTimestamp, parseMoneyVnd } from 'utils/helpers';

const DebtRepayTab = ({ customer }) => {
  const dispatch = useDispatch();

  const { allHistories, isAllHistoriesFetched: isFetched } =
    useSelector(selectHistory);

  const [debts, setDebts] = useState([]);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getAllHistories());
    } else {
      const filteredDebts = allHistories
        ?.filter(
          (history) =>
            history.type === 'DEBT' &&
            (history?.from?.cardNumber === customer?.cardNumber ||
              history?.dest?.cardNumber === customer?.cardNumber)
        )
        ?.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
      setDebts([...filteredDebts]);
    }
  }, [customer]);

  const headerTable = (
    <HeaderTable>
      <HeaderCell> </HeaderCell>
      <HeaderCell>Lender/Borrower</HeaderCell>
      <HeaderCell>Amount</HeaderCell>
      <HeaderCell>
        Type <ArrowDown />
      </HeaderCell>
      <HeaderCell>Status</HeaderCell>
      <HeaderCell>
        Date <ArrowDown />
      </HeaderCell>
    </HeaderTable>
  );
  return debts?.length > 0 ? (
    <Table widths={[10, 20, 20, 15, 15, 30]} headerTable={headerTable}>
      {debts?.map(({ id, from, totalAmount, status, createdAt }, index) => (
        <TableRow key={id}>
          <RowCell>{index + 1}</RowCell>
          <RowCell>{from?.accountName}</RowCell>
          <RowCell>{parseMoneyVnd(totalAmount)} VND</RowCell>
          <RowCell title='debtType'>
            {from?.cardNumber === customer?.cardNumber ? 'debt' : 'loan'}
          </RowCell>
          <RowCell title='status'>{status}</RowCell>
          <RowCell>
            {createdAt?.seconds
              ? convertTimestamp(createdAt.seconds * 1000)
              : convertTimestamp(createdAt)}
          </RowCell>
        </TableRow>
      ))}
    </Table>
  ) : (
    <span>No debts</span>
  );
};

export default DebtRepayTab;
