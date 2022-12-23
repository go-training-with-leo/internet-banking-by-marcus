import React from 'react';

import Loader from 'components/Loader';

export default {
  title: 'Loader',
  component: Loader,
};

const Template = (args) => {
  return <Loader {...args} />;
};

const Default = Template.bind({});

Default.args = {};

export { Default };
