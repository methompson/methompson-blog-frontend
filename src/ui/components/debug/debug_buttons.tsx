import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { BlogAPI } from '@/src/api/blog_api';
import { actions, AppDispatch } from '@/src/store';
import { Duration } from '@/src/shared/duration';
import { messengerInstance } from '@/src/shared/messenger';

import { DebugButton } from './debug_button';
import { Message, MessageType } from '@/src/models/message';

export function DebugButtonColumn() {
  return <div className='my-3 flex flex-col items-center'>
    <GetBlogPostsButton />
    <AddNewRandomMessageButton />
    <GetFileList />
    <UploadFile />
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

function AddNewRandomMessageButton() {
  const [count, setCount] = useState(0);

  function addMessage() {
    const msg = Message.newMessage({
      messageType: MessageType.Success,
      message: 'A Message',
      duration: 4000,
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

function UploadFile() {
  const dispatch = useDispatch<AppDispatch>();
  const [files, setFiles] = useState<File[]>([]);
  const [isPrivate, setIsPrivate] = useState(true);

  return (
    <div className="flex flex-row justify-between items-center w-full">
      <input
        type="file"
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          const fileList: File[] = [];
          for (const file of ev.target.files) {
            fileList.push(file);
          }
          setFiles(fileList);
        }}/>

      <div className='flex items-center'>
        <input
          type='checkbox'
          id='isPrivate'
          name='isPrivate'
          checked={isPrivate}
          onChange={(ev) => setIsPrivate(ev?.target?.checked ?? true)}/>
        <label className='px-1' htmlFor='isPrivate'>Private</label>
      </div>

      <DebugButton
        title="Upload File"
        action={async () => {
          if (files.length === 0) {
            // dispatch(actions.addErrorMessage({
            //   message: 'Must Select at least one file',
            //   duration: new Duration({ seconds: 5 }),
            // }));
            return;
          }

          dispatch(actions.uploadImages({
            files,
            ops: [],
          }));
        }} />
    </div>
  );
}