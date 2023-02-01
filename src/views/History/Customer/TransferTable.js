import React, { useEffect } from 'react';

import Table, { TableRow } from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { ArrowDown, Filter } from 'assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { selectCard, selectHistory } from 'core/selectors';
import { getTransfHistories } from 'global/redux/history/thunk';
import { convertTimestamp, parseMoneyVnd } from 'utils/helpers';

const headerTable = (
  <HeaderTable>
    <HeaderCell> </HeaderCell>
    <HeaderCell>Receive account</HeaderCell>
    <HeaderCell>Amount</HeaderCell>
    <HeaderCell>Bank</HeaderCell>
    <HeaderCell>
      Status <Filter />
    </HeaderCell>
    <HeaderCell>
      Date <ArrowDown />
    </HeaderCell>
  </HeaderTable>
);

const TransferTable = () => {
  const dispatch = useDispatch();

  const { payingCard } = useSelector(selectCard);
  const { transferHistories, isTransferHistoryFetched: isFetched } =
    useSelector(selectHistory);
  useEffect(() => {
    if (!isFetched) {
      dispatch(getTransfHistories({ cardNumber: payingCard?.cardNumber }));
    }
  }, [isFetched]);
  return (
    <Table widths={[10, 20, 20, 15, 15, 20]} headerTable={headerTable}>
      {transferHistories?.map(
        ({ dest, totalAmount, status, createdAt }, index) => (
          <TableRow key={createdAt}>
            <RowCell>{index + 1}</RowCell>
            <RowCell>{dest?.contactName}</RowCell>
            <RowCell>{parseMoneyVnd(totalAmount)} VND</RowCell>
            <RowCell>{dest?.bank}</RowCell>
            <RowCell title='status'>{status}</RowCell>
            <RowCell>
              {createdAt?.seconds
                ? convertTimestamp(createdAt.seconds * 1000)
                : convertTimestamp(createdAt)}
            </RowCell>
          </TableRow>
        )
      )}
    </Table>
  );
};

export default TransferTable;
