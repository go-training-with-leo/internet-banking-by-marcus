import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';
import { Cancel, Check, Clock, Reverse } from 'assets/images';

const Status = ({ failed, success, refund, paid, unpaid, cancelled }) => {
  return (
    <div
      className={classNames('status', {
        failed: failed,
        success: success,
        refund: refund,
        paid: paid,
        unpaid: unpaid,
        cancelled: cancelled,
      })}
    >
      {failed ? (
        <>
          <Cancel width={20} height={20} fill='red' />
          <span>Failed</span>
        </>
      ) : success ? (
        <>
          <Check width={20} height={20} fill='green' />
          <span>Success</span>
        </>
      ) : refund ? (
        <>
          <Reverse width={20} height={20} fill='yellow' />
          <span>Refund</span>
        </>
      ) : paid ? (
        <>
          <Check width={20} height={20} fill='green' />
          <span>Paid</span>
        </>
      ) : unpaid ? (
        <>
          <Clock width={20} height={20} fill='yellow' />
          <span>Unpaid</span>
        </>
      ) : (
        cancelled && (
          <>
            <Cancel width={20} height={20} fill='red' />
            <span>Canceled</span>
          </>
        )
      )}
    </div>
  );
};

Status.defaultProps = {
  failed: false,
  success: false,
  refund: false,
  paid: false,
  unpaid: true,
  cancelled: false,
};

Status.propTypes = {
  failed: PropTypes.bool,
  success: PropTypes.bool,
  refund: PropTypes.bool,
  paid: PropTypes.bool,
  unpaid: PropTypes.bool,
  cancelled: PropTypes.bool,
};
export default Status;
