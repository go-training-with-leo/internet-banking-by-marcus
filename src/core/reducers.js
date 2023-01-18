import { combineReducers } from '@reduxjs/toolkit';

import auth from 'global/redux/auth/slice';
import account from 'global/redux/account/slice';

const reducers = combineReducers({
  auth,
  account,
});

export default reducers;
