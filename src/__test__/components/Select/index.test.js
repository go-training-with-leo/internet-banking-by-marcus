import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Select from 'components/Select';
import { ACB } from 'assets/images';

describe('Test Select component', () => {
  const options = [
    { id: 'OT1', label: 'VCB', value: 1, icon: ACB },
    { id: 'OT2', label: 'ACB', value: 2, icon: ACB },
  ];

  describe('Select event', () => {});
  it('Click', async () => {
    const handleChange = jest.fn();
    const tree = render(
      <Select
        name='select'
        label='Label'
        onChange={handleChange}
        placeholder='Select option'
        options={options}
      />
    );

    const selectContainer = tree.container.querySelector(
      'div.select-input-container'
    );

    const select = selectContainer.lastChild;

    expect(select).toBeDefined();

    expect(select).toHaveTextContent('Select option');

    fireEvent.click(select);
    let option = tree.getByText('ACB');
    expect(option).toBeDefined();
    fireEvent.click(option);
    expect(select).toHaveTextContent('ACB');

    fireEvent.click(select);
    option = tree.getByText('VCB');
    expect(option).toBeDefined();
    fireEvent.click(option);
    expect(select).toHaveTextContent('VCB');
    expect(tree).toMatchSnapshot();
  });
});
