import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from 'global/redux/auth/slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['isLoading'],
};

const reducers = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
});

export default reducers;
