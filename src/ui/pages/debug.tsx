import React from 'react';

import StandardPage from '@src/ui/components/standard_page';

import { GetBlogPostsButton } from '@src/ui/components/debug/debug_buttons';

export default function DebugPage() {
  return (
    <StandardPage>
      <div className='my-3'>
        <GetBlogPostsButton />
      </div>
    </StandardPage>
  );
}