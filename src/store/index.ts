import { configureStore } from '@reduxjs/toolkit';

import { blogSlice } from '@src/store/blog';
import { messagingSlice } from '@src/store/messaging';

const store = configureStore({
  reducer: {
    blog: blogSlice.reducer,
    messaging: messagingSlice.reducer,
  },
});

const actions = {};

export { store, actions };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
