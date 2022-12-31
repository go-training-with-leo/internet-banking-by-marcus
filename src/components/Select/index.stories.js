import React from 'react';

import { ACB } from 'assets/images';
import SelectComponent from '.';

export default {
  title: 'Select',
  component: SelectComponent,
};

const options = [
  { id: 'OT1', label: 'VCB', value: 1, icon: ACB },
  { id: 'OT2', label: 'ACB', value: 2, icon: ACB },
];

const Select = () => {
  return (
    <SelectComponent
      name='select'
      label='Label'
      options={options}
      onChange={() => console.warn('onChange trigger')}
    />
  );
};

export { Select };
