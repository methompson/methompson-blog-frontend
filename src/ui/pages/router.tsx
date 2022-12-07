import { Routes, Route } from 'react-router-dom';
import React from 'react';

import { Home } from '@/src/ui/pages/home';
import { BlogPostPage } from '@/src/ui/pages/blog_post';
import { LoginPage } from '@/src/ui/pages/login';
import { DebugPage } from '@/src/ui/pages/debug';
import { NewPost } from '@/src/ui/pages/new_post';
import { FourOhFour } from '@/src/ui/pages/404';
import { FileList } from '@/src/ui/pages/file_list';
import { ImageUpload } from '@/src/ui/pages/image_upload';

export function BlogRouter() {
  return (
    <span>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/debug' element={<DebugPage />} />
        <Route path='/posts' element={<Home />} />
        <Route path='/posts/:page' element={<Home />} />
        <Route path='/post/:slug' element={<BlogPostPage />} />
        <Route path='/new_post' element={<NewPost />} />
        <Route path='/files' element={<FileList />} />
        <Route path='/upload_image' element={<ImageUpload />} />
        <Route path='*' element={<FourOhFour />} />
      </Routes>
    </span>
  );
}