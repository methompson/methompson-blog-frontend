import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Home from '@src/ui/pages/home';
import Login from '@src/ui/pages/login';
import Debug from '@src/ui/pages/debug';
import FourOhFour from '@src/ui/pages/404';

export default function BlogRouter() {
  return (
    <span>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/debug' element={<Debug />} />
        <Route path='*' element={<FourOhFour />} />
      </Routes>
    </span>
  );
}