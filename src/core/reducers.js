import { combineReducers } from '@reduxjs/toolkit';

import account from 'global/redux/account/slice';
import auth from 'global/redux/auth/slice';
import contact from 'global/redux/contact/slice';
import card from 'global/redux/card/slice';
import transfer from 'global/redux/transfer/slice';

const reducers = combineReducers({
  account,
  auth,
  contact,
  card,
  transfer,
});

export default reducers;
