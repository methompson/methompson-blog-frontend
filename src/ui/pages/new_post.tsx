import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch, actions } from '@src/store';
import { BlogPost } from '@/src/models/blog_post';
import { TextEditor } from '@src/shared/text_editor';

import { CenteredStandardPage } from '@src/ui/components/standard_page';
import { LabeledTextInput } from '@src/ui/components/new_post/text_input';
import { BlogContent } from '@src/ui/components/blog_content';

import '@src/ui/css/prosemirror_editor.css';

function removeAllChildNodes(parent: Element) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export function NewPost() {
  const [preview, setPreview] = useState('');
  // We never change the text editor, but we want to make sure it doesn't change when this is re-rendered
  // We don't define ths above the React component because we want to be able to eventually provide
  // already created content into the TextEditor for when this function allows for editing posts
  const [textEditor] = useState(new TextEditor({
    transactionCallback() {
      const content = textEditor.getMarkdownContent();
      setPreview(content);
    },
  }));

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const editorId = 'editor';

  useEffect(() => {
    const editorDiv = document.querySelector(`#${editorId}`);

    if (editorDiv === null) {
      return;
    }

    removeAllChildNodes(editorDiv);
    textEditor.makeAndInsertEditor(editorDiv);
  }, [textEditor]);

  const addNewPost = async () => {
    const post = textEditor.getMarkdownContent();

    console.log('Post:', post);

    // try {
    //   const result = await dispatch(actions.getBlogPost());
    //   console.log('get result', result);
    // } catch(e) {}

  };

  const bp = BlogPost.forPreview({
    title,
    body: preview,
  });

  return (
    <CenteredStandardPage>

      <LabeledTextInput
        name='Title'
        value={title}
        stretch={true}
        onChange={(e) => setTitle(e.target.value)} />

      <div id={editorId} />

      <LabeledTextInput
        name='Tags'
        value={tags}
        stretch={true}
        onChange={(e) => setTags(e.target.value)} />

      <div>
        <button
          className='bg-red-500 hover:bg-red-700 text-white rounded-md p-2 mb-2'
          onClick={addNewPost}>
          Submit Post
        </button>
      </div>

      <div>Preview</div>

      <BlogContent blogPost={bp} />

    </CenteredStandardPage>
  );
}