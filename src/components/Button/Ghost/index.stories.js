import React from 'react';

import { PlusIcon } from 'assets/images';
import GhostButton from '.';

export default {
  title: 'Button',
  component: GhostButton,
};

const Ghost = () => (
  <GhostButton startIcon={<PlusIcon width={20} height={20} />}>
    Label
  </GhostButton>
);

export { Ghost };
