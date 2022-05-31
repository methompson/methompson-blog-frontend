import { configureStore } from '@reduxjs/toolkit';

import { blogSlice } from '@src/store/blog';
import {
  messagingSlice,
  messagingActions,
  messagingSelectors,
} from '@/src/store/messaging';

const store = configureStore({
  reducer: {
    blog: blogSlice.reducer,
    messaging: messagingSlice.reducer,
  },
});

const actions = {
  ...messagingActions,
};

const selectors = {
  ...messagingSelectors,
};

export { store, actions, selectors };

const state = store.getState();
export type StateType = typeof state;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
