import { combineReducers } from '@reduxjs/toolkit';

import auth from 'global/redux/auth/slice';
import card from 'global/redux/card/slice';

const reducers = combineReducers({
  auth,
  card,
});

export default reducers;
