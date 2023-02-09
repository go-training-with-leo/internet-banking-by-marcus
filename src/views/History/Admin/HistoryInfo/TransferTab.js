import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table, { TableRow } from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { ArrowDown, Filter } from 'assets/images';
import { getAllHistories } from 'global/redux/history/thunk';
import { selectHistory } from 'core/selectors';
import {
  convertTimestamp,
  divideSpaceIdCard,
  parseMoneyVnd,
} from 'utils/helpers';

const TransferTab = ({ customer }) => {
  const dispatch = useDispatch();

  const { allHistories, isAllHistoriesFetched: isFetched } =
    useSelector(selectHistory);

  const [transfer, setTransfer] = useState([]);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getAllHistories());
    } else {
      const filteredTransfer = allHistories?.filter(
        (history) =>
          history.from.cardNumber === customer?.cardNumber &&
          history.type === 'TRANSFER'
      );
      setTransfer(filteredTransfer);
    }
  }, [customer]);

  const headerTable = (
    <HeaderTable>
      <HeaderCell> </HeaderCell>
      <HeaderCell>Receive account</HeaderCell>
      <HeaderCell>Amount</HeaderCell>
      <HeaderCell>Bank</HeaderCell>
      <HeaderCell>
        Status <Filter fill='white' />
      </HeaderCell>
      <HeaderCell>
        Date <ArrowDown />
      </HeaderCell>
    </HeaderTable>
  );
  return transfer?.length > 0 ? (
    <Table widths={[10, 20, 20, 15, 15, 20]} headerTable={headerTable}>
      {transfer?.map(({ dest, totalAmount, status, createdAt }, index) => (
        <TableRow key={createdAt}>
          <RowCell>{index + 1}</RowCell>
          <RowCell>
            <p>
              {dest?.contactName}
              <br />
              <br />
              {divideSpaceIdCard(dest?.cardNumber)}
            </p>
          </RowCell>
          <RowCell>{parseMoneyVnd(totalAmount)} VND</RowCell>
          <RowCell>{dest?.bank}</RowCell>
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
    <span>No Receive</span>
  );
};

export default TransferTab;
