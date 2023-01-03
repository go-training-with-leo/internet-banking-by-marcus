import React from 'react';

import { PlusIcon } from 'assets/images';
import HeaderCell from '.';

export default {
  title: 'Table Header Cell',
  component: HeaderCell,
};

const TableHeaderCell = () => {
  return <HeaderCell>String</HeaderCell>;
};

const TableHeaderCellIcon = () => {
  return (
    <HeaderCell>
      Title <PlusIcon width={20} height={20} />
    </HeaderCell>
  );
};

export { TableHeaderCell, TableHeaderCellIcon };
