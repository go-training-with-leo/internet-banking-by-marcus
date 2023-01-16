import { Search } from 'assets/images';
import IconButton from 'components/Button/Icon';
import React from 'react';

import Input from 'components/Input';

import './style.scss';

const NewContact = () => {
  return (
    <div className='contact-container'>
      <div className='search-contact'>
        <div className='contact-input'>
          <Input
            name='contact'
            label='Card number'
            placeholder='Enter the contact’s card number'
            onChange={(e) => console.warn(e.target.value)}
          />
        </div>
        <div className='contact-btn'>
          <IconButton danger>
            <Search width={20} height={20} />
          </IconButton>
        </div>
      </div>
      <div className='contact-tab'>
        <div className='tab-line'>
          <span>Name:</span>
          <span>John Doe</span>
          <span>Bank:</span>
          <span>EIGHT.Bank</span>
        </div>
        <div className='tab-line'>
          <span>Card number:</span>
          <span>1274 2834 2938 0031</span>
        </div>
      </div>
    </div>
  );
};

export default NewContact;
