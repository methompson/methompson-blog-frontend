import React from 'react';
import { Provider } from 'react-redux';

import { store } from '@src/store';

import { BlogRouter } from '@src/ui/pages/router';
import { Messenger } from '@/src/ui/components/messenger';
import { AuthenticationHandler } from '@src/ui/components/authentication';

export function App() {
  return (
    <Provider store={store}>
      <BlogRouter />
      <Messenger />
      <AuthenticationHandler />
    </Provider>
  );
}