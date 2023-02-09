import React from 'react';
import { render } from '@testing-library/react';
import TimeTracking from '.';

describe('Time tracking', () => {
  it('Props valid', () => {
    const currentTime = new Date().getTime();
    const tree = render(
      <TimeTracking
        currentTime={currentTime}
        min={currentTime}
        max={currentTime}
      />
    );

    const timeTracking = tree.container.querySelector('input.slider');
    const tick = tree.container.querySelector('span.o_txt');

    expect(timeTracking).toHaveAttribute(
      'min',
      String(Math.floor(currentTime / 1000))
    );
    expect(timeTracking).toHaveAttribute(
      'max',
      String(Math.floor(currentTime / 1000))
    );
    expect(timeTracking).toHaveAttribute('value', String(currentTime / 1000));
    expect(tick).toHaveTextContent('09/02/2023');

    expect(tree).toMatchSnapshot();
  });
});
