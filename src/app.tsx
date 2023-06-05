import { Provider } from 'react-redux';

import { store } from '@/src/store';

import { BlogRouter } from '@/src/ui/router';
import { MessagingComponent } from '@/src/ui/components/messaging';
import { AuthenticationHandler } from '@/src/ui/components/authentication_handler';

export function App() {
  return (
    <Provider store={store}>
      <AuthenticationHandler>
        <BlogRouter />
        <MessagingComponent />
      </AuthenticationHandler>
    </Provider>
  );
}