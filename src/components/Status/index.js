import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Cancel, Check, Clock, Reverse } from 'assets/images';

import './style.scss';

const Status = ({
  failed,
  success,
  refund,
  paid,
  unpaid,
  canceled,
  pending,
}) => {
  return (
    <div
      className={classNames('status', {
        failed: failed,
        pending: pending,
        success: success,
        refund: refund,
        paid: paid,
        unpaid: unpaid,
        canceled: canceled,
      })}
    >
      {failed ? (
        <>
          <Cancel width={20} height={20} fill='red' />
          <span>Failed</span>
        </>
      ) : pending ? (
        <>
          <img src={Clock} width={20} height={20} alt='clock' />
          <span>Pending</span>
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
      ) : canceled ? (
        <>
          <Cancel width={20} height={20} fill='red' />
          <span>Canceled</span>
        </>
      ) : (
        unpaid && (
          <>
            <img src={Clock} width={20} height={20} alt='clock' />
            <span>Unpaid</span>
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
  pending: false,
  canceled: false,
};

Status.propTypes = {
  failed: PropTypes.bool,
  success: PropTypes.bool,
  refund: PropTypes.bool,
  paid: PropTypes.bool,
  unpaid: PropTypes.bool,
  pending: PropTypes.bool,
  canceled: PropTypes.bool,
};
export default Status;
