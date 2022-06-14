import React, { useEffect, useState } from 'react';

import { BlogPost } from '@/src/models/blog_post';
import { TextEditor } from '@src/shared/text_editor';

import { StandardPage } from '@src/ui/components/standard_page';
import { LabeledTextInput } from '@src/ui/components/new_post/text_input';

import '@src/ui/css/prosemirror_editor.css';
import { BlogContent } from '../components/blog_content';

function removeAllChildNodes(parent: Element) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export function NewPost() {
  const [preview, setPreview] = useState('');

  const [textEditor, setTextEditor] = useState(new TextEditor({
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
      // console.log('It\'s null, Jim');
      return;
    }

    removeAllChildNodes(editorDiv);
    textEditor.makeAndInsertEditor(editorDiv);
  }, [textEditor]);

  const getCurrentContent = () => {
    // console.log('Click');
    // console.log(textEditor.getMarkdownContent());
  };

  const bp = BlogPost.forPreview({
    title,
    body: preview,
  });

  return (
    <StandardPage>
      <div className='centeredPageContainer w-full'>

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
            className='bg-red-500 hover:bg-red-700 text-white rounded-sm p-2 mb-2'
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