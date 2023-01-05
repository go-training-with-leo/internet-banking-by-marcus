import { createAsyncThunk } from '@reduxjs/toolkit';

import authentication from 'global/redux/auth/request';

const signIn = createAsyncThunk('auth/signin', async (variables) => {
  const { email, password } = variables;

  try {
    const data = await authentication.signIn(email, password);

    return {
      status: true,
      data,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});

export { signIn };
