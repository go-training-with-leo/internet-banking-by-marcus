import { combineReducers } from '@reduxjs/toolkit';

import account from 'global/redux/account/slice';
import auth from 'global/redux/auth/slice';
import card from 'global/redux/card/slice';
import contact from 'global/redux/contact/slice';
import debt from 'global/redux/debt/slice';
import history from 'global/redux/history/slice';
import notification from 'global/redux/notification/slice';
import transfer from 'global/redux/transfer/slice';

const reducers = combineReducers({
  account,
  auth,
  card,
  contact,
  debt,
  history,
  notification,
  transfer,
});

export default reducers;
