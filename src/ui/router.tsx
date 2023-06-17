import { Routes, Route } from 'react-router-dom';

import { Home } from '@/src/ui/pages/home';
import { BlogPostPage } from '@/src/ui/pages/blog_post';
import { LoginPage } from '@/src/ui/pages/login';
import { DebugPage } from '@/src/ui/pages/debug';
import { NewPost } from '@/src/ui/pages/new_post';
import { FourOhFour } from '@/src/ui/pages/404';
import { FileListPage } from '@/src/ui/pages/file_list';
import { ImageUploadPage } from '@/src/ui/pages/image_upload';
import { BudgetPage } from '@/src/ui/pages/budget';
import { UpdatePostPage } from './pages/update_post';
import { Dashboard } from './pages/dashboard';

export function BlogRouter() {
  return (
    <span>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/budget' element={<BudgetPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/debug' element={<DebugPage />} />
        <Route path='/files' element={<FileListPage />} />
        <Route path='/new_post' element={<NewPost />} />
        <Route path='/posts' element={<Home />} />
        <Route path='/posts/:page' element={<Home />} />
        <Route path='/post/:slug' element={<BlogPostPage />} />
        <Route path='/update/:slug' element={<UpdatePostPage />} />
        <Route path='/upload_image' element={<ImageUploadPage />} />
        <Route path='*' element={<FourOhFour />} />
      </Routes>
    </span>
  );
}