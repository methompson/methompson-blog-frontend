import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Home from '@src/ui/pages/home';
import BlogPost from '@src/ui/pages/blog_post';
import Login from '@src/ui/pages/login';
import Debug from '@src/ui/pages/debug';
import NewPost from '@src/ui/pages/new_post';
import FourOhFour from '@src/ui/pages/404';

export default function BlogRouter() {
  return (
    <span>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/debug' element={<Debug />} />
        <Route path='/posts' element={<Home />} />
        <Route path='/posts/:slug' element={<BlogPost />} />
        <Route path='/new_post' element={<NewPost />} />
        <Route path='*' element={<FourOhFour />} />
      </Routes>
    </span>
  );
}