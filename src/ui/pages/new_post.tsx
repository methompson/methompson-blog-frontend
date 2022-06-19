import React, { useEffect, useState } from 'react';

import { BlogPost } from '@/src/models/blog_post';
import { TextEditor } from '@src/shared/text_editor';

import { StandardPage } from '@src/ui/components/standard_page';
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

  const editorId = 'editor';

  useEffect(() => {
    const editorDiv = document.querySelector(`#${editorId}`);

    if (editorDiv === null) {
      return;
    }

    removeAllChildNodes(editorDiv);
    textEditor.makeAndInsertEditor(editorDiv);
  }, [textEditor]);

  const getCurrentContent = () => {
    // console.log('Click');
    console.log(textEditor.getMarkdownContent());
  };

  const bp = BlogPost.forPreview({
    title,
    body: preview,
  });

  return (
    // TODO shrink this container when the window is larger than md or lg
    <StandardPage>
      <div className='centeredPageContainer w-full lg:max-w-3xl'>

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
            onClick={getCurrentContent}>
            Get Current Content
          </button>
        </div>

        <div>Preview</div>

        <BlogContent blogPost={bp} />

      </div>
    </StandardPage>
  );
}