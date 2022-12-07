import { configureStore } from '@reduxjs/toolkit';

import {
  blogSlice,
  blogActions,
 } from './blog';

import {
  fileSlice,
  fileActions,
 } from './file';

import {
  messagingSlice,
  messagingActions,
  messagingSelectors,
} from './messaging';

import {
  authActions,
  authSlice,
  authSelectors,
} from './auth';

const store = configureStore({
  reducer: {
    blog: blogSlice.reducer,
    file: fileSlice.reducer,
    messaging: messagingSlice.reducer,
    auth: authSlice.reducer,
  },
});

const actions = {
  ...messagingActions,
  ...authActions,
  ...blogActions,
  ...fileActions,
};

const selectors = {
  ...messagingSelectors,
  ...authSelectors,
};

export { store, actions, selectors };

const state = store.getState();

export type StateType = typeof state;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
