import React from 'react';
import { convertDatetamp } from 'utils/helpers';

import './style.scss';

const TimeTracking = ({ currentTime, min, max }) => {
  const minDateInSeconds = min?.seconds
    ? min.seconds
    : Math.floor(new Date(min) / 1000);
  const maxDateInSeconds = max?.seconds
    ? max.seconds
    : Math.floor(new Date(max) / 1000);

  return (
    <div className='options'>
      <h1>TIME TRACKING</h1>
      <input
        readOnly
        className='slider'
        type='range'
        min={minDateInSeconds}
        max={maxDateInSeconds}
        disabled
        list='steplist'
        value={currentTime / 1000}
      />

      <div className='ticks'>
        <span className='o_txt'>
          {convertDatetamp(minDateInSeconds * 1000)}
        </span>
        <span className='o_txt'>
          {convertDatetamp(((minDateInSeconds + maxDateInSeconds) / 2) * 1000)}
        </span>
        <span className='o_txt'>
          {convertDatetamp(maxDateInSeconds * 1000)}
        </span>
      </div>
    </div>
  );
};

export default TimeTracking;
