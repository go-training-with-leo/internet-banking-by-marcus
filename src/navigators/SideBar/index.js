import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { Back, EightLogo } from 'assets/images';

import './style.scss';
import useWindowDimensions from 'components/hooks/useWindowDimensions';

const SideBar = ({ children, bottomItem, showSideBar, setShowSideBar }) => {
  const { width } = useWindowDimensions();
  return (
    <div
      className={classNames('side-bar', {
        showSideBar: showSideBar && width < 768,
      })}
    >
      <div className='side-bar__top'>
        <div className='navigate-btn'>
          <EightLogo className='logo' />
          <Back
            className='back-btn'
            width={30}
            height={30}
            fill='white'
            onClick={setShowSideBar}
          />
        </div>
        <div className='list-item'>{children}</div>
      </div>
      {bottomItem}
    </div>
  );
};

SideBar.defaultProps = {
  children: undefined,
  bottomItem: undefined,
};

SideBar.propTypes = {
  children: PropTypes.node,
  bottomItem: PropTypes.node,
};

export default memo(SideBar);
