import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import Table, { TableRow } from 'components/Table';
import RowCell from 'components/Table/RowCell';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import { CreditCardGradient, DeleteIcon, Filter, Info } from 'assets/images';
import useToggle from 'components/hooks/useToggle';
import DeleteModal from './DeleteModal';
import otherData from './otherData';
import youData from './youData';
import DetailModal from './DetailModal';
import PaymentModal from './PaymentModal';

import './style.scss';

const CREATE_BY_YOU = 'CREATE_BY_YOU';
const RECV_FROM_OTHERS = 'RECV_FROM_OTHERS';

const dataTables = {
  CREATE_BY_YOU: youData,
  RECV_FROM_OTHERS: otherData,
};

const headerTable = (
  <HeaderTable>
    <HeaderCell>Debt account</HeaderCell>
    <HeaderCell>Amount</HeaderCell>
    <HeaderCell>
      Status <Filter fill='white' />
    </HeaderCell>
    <HeaderCell>Actions</HeaderCell>
  </HeaderTable>
);

const Debts = () => {
  const [deleteModal, setDeleteModal] = useToggle();
  const [paymentModal, setPaymentModal] = useToggle();
  const [infoModal, setInfoModal] = useToggle();
  const [activeTab, setActiveTab] = useState(CREATE_BY_YOU);
  const [dataTable, setDataTable] = useState(dataTables[activeTab]);

  useEffect(() => {
    setDataTable(dataTables[activeTab]);
  }, [activeTab]);

  return (
    <div className='debt-view'>
      <div className='debt-view-tabs'>
        <span
          className={classNames({ active: activeTab === CREATE_BY_YOU })}
          onClick={() => setActiveTab(CREATE_BY_YOU)}
          role='tab'
          tabIndex={0}
        >
          Created by you
        </span>
        <span
          className={classNames({ active: activeTab === RECV_FROM_OTHERS })}
          onClick={() => setActiveTab(RECV_FROM_OTHERS)}
          role='tab'
          tabIndex={0}
        >
          Received from others
        </span>
      </div>
      <div className='debt-tables'>
        <Table widths={[30, 25, 20, 25]} headerTable={headerTable}>
          {dataTable.map(({ id, debtAccount, amount, status }, index) => (
            <TableRow key={id}>
              <RowCell>{index + 1}</RowCell>
              <RowCell>{debtAccount}</RowCell>
              <RowCell>{amount}</RowCell>
              <RowCell title='status'>{status}</RowCell>
              <RowCell>
                {activeTab === RECV_FROM_OTHERS && (
                  <CreditCardGradient
                    className='credit-svg'
                    width={30}
                    height={30}
                    onClick={setPaymentModal}
                    fill='linear-gradient(90deg, #EF230C 2.5%, #FFD351 100%)'
                  />
                )}
                <Info
                  width={30}
                  height={30}
                  fill='red'
                  onClick={setInfoModal}
                />
                <DeleteIcon
                  width={30}
                  height={30}
                  fill='red'
                  onClick={setDeleteModal}
                />
              </RowCell>
            </TableRow>
          ))}
        </Table>
      </div>
      {paymentModal && <PaymentModal setToggle={setPaymentModal} />}
      {infoModal && <DetailModal setToggle={setInfoModal} />}
      {deleteModal && <DeleteModal setToggle={setDeleteModal} />}
    </div>
  );
};

export default Debts;
