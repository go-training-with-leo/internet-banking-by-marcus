import React from 'react';

import DebtType from '.';

export default {
  title: 'Debt Type',
  component: DebtType,
};

const Debt = () => <DebtType debt />;
const Loan = () => <DebtType loan />;

export { Debt, Loan };
