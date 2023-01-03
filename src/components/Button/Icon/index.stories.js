import React from 'react';

import { PlusIcon } from 'assets/images';
import IconButton from '.';

export default {
  title: 'Button',
  component: IconButton,
};

const Icon = () => (
  <IconButton danger>
    Label
    <PlusIcon />
  </IconButton>
);

export { Icon };
