import React from 'react';

import Status from '.';

export default {
  title: 'Status',
  component: Status,
};

const Failed = () => <Status failed />;
const Success = () => <Status success />;
const Refund = () => <Status refund />;
const Paid = () => <Status paid />;
const UnPaid = () => <Status unpaid />;
const Canceled = () => <Status canceled />;

export { Canceled, Failed, Paid, Refund, Success, UnPaid };
