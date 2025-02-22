import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app';

import '@/src/ui/css/index.css';
import '@/src/ui/css/styles.css';

console.log('Main.tsx loaded, version 2025-02-21 / 2');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
