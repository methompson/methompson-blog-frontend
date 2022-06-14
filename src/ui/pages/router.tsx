import { Routes, Route } from 'react-router-dom';
import React from 'react';

import { Home } from '@src/ui/pages/home';
import { BlogPostPage } from '@src/ui/pages/blog_post';
import { LoginPage } from '@src/ui/pages/login';
import { DebugPage } from '@src/ui/pages/debug';
import { NewPost } from '@src/ui/pages/new_post';
import { FourOhFour } from '@src/ui/pages/404';

export function BlogRouter() {
  return (
    <span>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/debug' element={<DebugPage />} />
        <Route path='/posts' element={<Home />} />
        <Route path='/posts/:slug' element={<BlogPostPage />} />
        <Route path='/new_post' element={<NewPost />} />
        <Route path='*' element={<FourOhFour />} />
      </Routes>
    </span>
  );
}