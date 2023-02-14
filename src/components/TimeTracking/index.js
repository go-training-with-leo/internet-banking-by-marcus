import React from 'react';
import { convertDatetamp, dateInSeconds } from 'utils/helpers';

import './style.scss';

const TimeTracking = ({ currentTime, min, max }) => {
  return (
    <div className='options'>
      <h1>TIME TRACKING</h1>
      <input
        readOnly
        className='slider'
        type='range'
        min={dateInSeconds(min)}
        max={dateInSeconds(max)}
        list='steplist'
        value={currentTime / 1000}
      />

      <div className='range__output' aria-hidden='true' data-tip>
        <div className='range__output-value-track'>
          <div className='range__output-values' data-values />
        </div>
      </div>
      <div className='ticks'>
        <span className='o_txt'>
          {convertDatetamp(dateInSeconds(min) * 1000)}
        </span>
        <span className='o_txt'>
          {convertDatetamp(
            ((dateInSeconds(min) + dateInSeconds(max)) / 2) * 1000
          )}
        </span>
        <span className='o_txt'>
          {convertDatetamp(dateInSeconds(max) * 1000)}
        </span>
      </div>
    </div>
  );
};

export default TimeTracking;
