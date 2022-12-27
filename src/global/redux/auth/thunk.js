import { createAsyncThunk } from '@reduxjs/toolkit';

import authentication from 'global/redux/auth/request';

const signIn = createAsyncThunk('auth/signin', async (variables) => {
  const { email, password } = variables;

  const data = await authentication.signIn(email, password);

  return {
    data,
  };
});

export { signIn };
