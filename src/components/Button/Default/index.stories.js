import React from 'react';

import Button from 'components/Button/Default';

import { DeleteIcon } from 'assets/images';

export default {
  title: 'Button',
  component: Button,
};

const Default = () => (
  <Button startIcon={<DeleteIcon width={20} height={20} />}>Label</Button>
);

export { Default };
