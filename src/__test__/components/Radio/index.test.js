import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';

import Radio from 'components/Radio';

describe('Radio', () => {
  it('Props valid', () => {
    const tree = render(
      <Radio label='radio' name='radioBox' value='20' checked />
    );
    const input = tree.container.querySelector('input.radio-input');
    const label = tree.container.querySelector('span.label');

    expect(input).toHaveAttribute('type', 'radio');
    expect(input).toHaveAttribute('name', 'radioBox');
    expect(input).toHaveAttribute('value', '20');

    expect(label).not.toHaveClass('hide');

    expect(tree).toMatchSnapshot();
  });
});

describe('Radio', () => {
  it('Props valid', async () => {
    const handleClick = jest.fn();
    const tree = render(
      <div className='radio-group'>
        <Radio
          name='contact'
          onChange={handleClick}
          value='radio-1'
          label='From your existing contacts'
        />
        <Radio
          name='contact'
          value='radio-2'
          onChange={handleClick}
          label='From a new contact'
        />
      </div>
    );
    const input = tree.container.querySelector('input.radio-input');
    const label = tree.container.querySelector('span.label');

    await act(async () => {
      fireEvent.click(input);
    });

    expect(input).toHaveAttribute('type', 'radio');
    expect(input).toHaveAttribute('name', 'contact');
    expect(input).toHaveAttribute('value', 'radio-1');
    expect(handleClick).toBeCalled();

    expect(handleClick).toBeCalledTimes(1);
    expect(label).not.toHaveClass('hide');

    expect(tree).toMatchSnapshot();
  });
});
