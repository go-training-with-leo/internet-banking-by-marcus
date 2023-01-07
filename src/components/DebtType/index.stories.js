import React from 'react';

import DebtType from '.';

export default {
  title: 'Debt Type',
  component: DebtType,
};

const Debt = () => <DebtType type='debt' />;
const Loan = () => <DebtType type='loan' />;

export { Debt, Loan };
