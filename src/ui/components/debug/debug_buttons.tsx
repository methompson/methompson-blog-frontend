import React from 'react';
import { v4 } from 'uuid';

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

export function AddRandomMessageButton() {
  return (
    <DebugButton
      title='Add Random Message'
      action={async () => {
        const title = v4();

      }} />
  );
}