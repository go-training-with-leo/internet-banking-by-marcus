import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllNotifs as getAllNotifsReq } from './request';

const getAllNotifs = createAsyncThunk('notification/getALlNotifs', async () => {
  try {
    const allNotifs = await getAllNotifsReq();
    return {
      status: true,
      allNotifs,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});

export { getAllNotifs };
