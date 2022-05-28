import React from 'react';

import { BlogAPI } from '@src/api/blog_api';

import DebugButton from './debug_button';

export function GetBlogPostsButton() {
  return (
    <DebugButton
      title='Get Blog Posts'
      action={async () => {
        const bapi = new BlogAPI();
        const list = await bapi.getBlogList();

        console.log(list);
      }} />
  );
}