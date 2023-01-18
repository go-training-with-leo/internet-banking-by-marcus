import { combineReducers } from '@reduxjs/toolkit';

import account from 'global/redux/account/slice';
import auth from 'global/redux/auth/slice';
import card from 'global/redux/card/slice';

const reducers = combineReducers({
  auth,
  account,
  card,
});

export default reducers;
