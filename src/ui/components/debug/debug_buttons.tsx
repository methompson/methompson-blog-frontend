import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { BlogAPI } from '@src/api/blog_api';
import { actions, AppDispatch } from '@src/store';
import { Duration } from '@src/shared/duration';

import { DebugButton } from './debug_button';

export function DebugButtonColumn() {
  return <div className='my-3 flex flex-col items-center'>
    <GetBlogPostsButton />
    <AddRandomMessageButton />
  </div>;
}

function GetBlogPostsButton() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <DebugButton
      title='Get Blog Posts'
      action={async () => {
        const bapi = new BlogAPI();
        try {
          const list = await bapi.getBlogList();
          // console.log(list);
        } catch (e) {
          dispatch(actions.addErrorMessage({
            message: `Unable to retrieve blog posts, ${e}`,
          }));
        }
      }} />
  );
}

function AddRandomMessageButton() {
  const dispatch = useDispatch<AppDispatch>();

  const [count, setCount] = useState(0);

  return (
    <DebugButton
      title='Add Random Message'
      action={async () => {
        dispatch(actions.addSuccessMessage({
          message: `Hello, World! - ${count}`,
          duration: new Duration({ seconds: 5 }),
        }));

        setCount(count + 1);
      }} />
  );
}