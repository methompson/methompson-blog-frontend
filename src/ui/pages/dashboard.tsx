import { Link } from 'react-router-dom';

import { AuthenticationGuard } from '@/src/ui/components/navigation_guard';
import { CenteredStandardPage } from '@/src/ui/components/standard_page';
import { Card } from '@/src/ui/components/card';

export function Dashboard() {
  const linkClasses = [
    'underline',
    'text-slate-900',
    'hover:text-slate-500',
  ].join(' ');

  return <AuthenticationGuard>
    <CenteredStandardPage>
      <Card>
        <div>
          <h2 className='text-2xl font-black'>Dashboard</h2>
          <ul className='list-disc my-4'>
            <li>Blog List</li>
            <li><Link to='/new_post' className={linkClasses}>Add a New Blog Post</Link></li>
            <li>Images List</li>
            <li><Link to='/upload_image' className={linkClasses}>Upload an Image</Link></li>
            <li><Link to='/files' className={linkClasses}>Files List</Link></li>
            <li>Upload a File</li>
            <li><Link to='/debug' className={linkClasses}>Debug Menu</Link></li>
          </ul>
        </div>
      </Card>
    </CenteredStandardPage>
  </AuthenticationGuard>;
}