import React from 'react';
import { Provider } from 'react-redux';

import BlogRouter from '@src/ui/pages/router';
import { store } from '@src/store';

function App() {
  return (
    <Provider store={store}>
      <BlogRouter />
    </Provider>
  );
}

export default App;
