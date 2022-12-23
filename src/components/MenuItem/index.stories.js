import React from 'react';

import MenuItem from 'components/MenuItem';

import { PlusIcon } from 'assets/images';

export default {
  title: 'Menu Item',
  component: MenuItem,
};

const Template = (args) => {
  return <MenuItem {...args} />;
};

const Default = Template.bind({});

Default.args = {
  icon: <PlusIcon fill='#000' />,
  children: 'Label',
  isActive: true,
};

export { Default };
