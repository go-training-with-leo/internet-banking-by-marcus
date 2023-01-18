import { combineReducers } from '@reduxjs/toolkit';

import auth from 'global/redux/auth/slice';
import contact from 'global/redux/contact/slice';

const reducers = combineReducers({
  auth,
  contact,
});

export default reducers;
