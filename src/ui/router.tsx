import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { FourOhFour } from '@/src/ui/pages/404';
import { CenteredLoadingScreen } from './components/standard_page';

export function BlogRouter() {
  const Home = lazy(() => import('@/src/ui/pages/home').then((module) => ({ default: module.HomePage })));
  const BlogPostPage = lazy(() => import('@/src/ui/pages/blog_post').then((module) => ({ default: module.BlogPostPage })));
  const LoginPage = lazy(() => import('@/src/ui/pages/login').then((module) => ({ default: module.LoginPage })));
  const DebugPage = lazy(() => import('@/src/ui/pages/debug').then((module) => ({ default: module.DebugPage })));
  const NewPost = lazy(() => import('@/src/ui/pages/new_post').then((module) => ({ default: module.NewPost })));
  const FileListPage = lazy(() => import('@/src/ui/pages/file_list').then((module) => ({ default: module.FileListPage })));
  const ImageUploadPage = lazy(() => import('@/src/ui/pages/image_upload').then((module) => ({ default: module.ImageUploadPage })));
  const BudgetPage = lazy(() => import('@/src/ui/pages/budget').then((module) => ({ default: module.BudgetPage })));
  const UpdatePostPage = lazy(() => import('@/src/ui/pages/update_post').then((module) => ({ default: module.UpdatePostPage })));
  const DashboardPage = lazy(() => import('@/src/ui/pages/dashboard').then((module) => ({ default: module.DashboardPage })));
  const FileUploadPage = lazy(() => import('@/src/ui/pages/file_upload').then((module) => ({ default: module.FileUpload })));

  return (
    <Suspense fallback={<CenteredLoadingScreen />}>
      <span>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/budget' element={<BudgetPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/debug' element={<DebugPage />} />
          <Route path='/files' element={<FileListPage />} />
          <Route path='/new_post' element={<NewPost />} />
          <Route path='/posts' element={<Home />} />
          <Route path='/posts/:page' element={<Home />} />
          <Route path='/post/:slug' element={<BlogPostPage />} />
          <Route path='/update/:slug' element={<UpdatePostPage />} />
          <Route path='/image_upload' element={<ImageUploadPage />} />
          <Route path='/file_upload' element={<FileUploadPage />} />
          <Route path='*' element={<FourOhFour />} />
        </Routes>
      </span>
    </Suspense>
  );
}