import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {},
  reducers: {},
});

export { blogSlice };
