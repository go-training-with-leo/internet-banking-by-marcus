import React from 'react';

import RadioComponent from '.';

export default {
  title: 'Radio',
  component: RadioComponent,
};

const Radio = () => <RadioComponent checked />;
const RadioNoCheck = () => <RadioComponent />;

export { Radio, RadioNoCheck };
