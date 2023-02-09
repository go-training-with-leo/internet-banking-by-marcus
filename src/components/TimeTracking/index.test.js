import React from 'react';
import { render } from '@testing-library/react';
import TimeTracking from '.';

describe('Time tracking', () => {
  const currentTime = 10000;
  const min = 5000;
  const max = 15000;
  it('Props valid', () => {
    const tree = render(
      <TimeTracking currentTime={currentTime} min={min} max={max} />
    );

    const timeTracking = tree.container.querySelector('input.slider');

    expect(timeTracking).toHaveAttribute('min', String(Math.floor(min / 1000)));
    expect(timeTracking).toHaveAttribute('max', String(Math.floor(max / 1000)));
    expect(timeTracking).toHaveAttribute('value', String(currentTime / 1000));

    expect(tree).toMatchSnapshot();
  });
});
