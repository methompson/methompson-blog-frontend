import { configureStore } from '@reduxjs/toolkit';

import { blogSlice } from './blog';

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
    messaging: messagingSlice.reducer,
    auth: authSlice.reducer,
  },
});

const actions = {
  ...messagingActions,
  ...authActions,
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
