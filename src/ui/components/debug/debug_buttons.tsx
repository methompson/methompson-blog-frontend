import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { BlogAPI } from '@/src/api/blog_api';
import { actions, AppDispatch } from '@/src/store';
import { messengerInstance } from '@/src/shared/messenger';

import { DebugButton } from './debug_button';
import { Message, MessageType } from '@/src/models/message';
import { Duration } from '@/src/shared/duration';

export function DebugButtonColumn() {
  return <div className='my-3 flex flex-col items-center'>
    <GetBlogPostsButton />
    <AddNewRandomMessageButton />
    <GetFileList />
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
          messengerInstance.addErrorMessage({
            message: `Unable to retrieve blog posts, ${e}`,
          });
        }
      }} />
  );
}

function AddNewRandomMessageButton() {
  const [count, setCount] = useState(0);

  function addMessage() {
    const msg = Message.newMessage({
      messageType: MessageType.Success,
      message: 'A Message',
      duration: new Duration({seconds: 4}),
    });

    messengerInstance.addMessage(msg);
    setCount(count + 1);
  }

  return (
    <DebugButton
      title='Add New Random Message'
      action={addMessage} />
  );
}

function GetFileList() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <DebugButton
      title='Get File List'
      action={async () => {
        try {
          dispatch(actions.getFileList({}));
        } catch (e) {}
      }} />
  );
}