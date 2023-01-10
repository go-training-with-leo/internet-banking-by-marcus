import React from 'react';

import { PlusIcon } from 'assets/images';
import TableCell from 'components/Table/HeaderCell';
import Header from '.';

export default {
  title: 'Page Header',
  component: Header,
};

const HeaderTable = () => (
  <Header>
    <TableCell>
      <span>Header</span>
      <PlusIcon />
    </TableCell>
  </Header>
);

export { HeaderTable };
