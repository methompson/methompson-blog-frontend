import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const messagingSlice = createSlice({
  name: 'messaging',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state) => {},
  },
});

export { messagingSlice };
