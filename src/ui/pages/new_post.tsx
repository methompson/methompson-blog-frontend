import React, { useEffect, useState } from 'react';

import StandardPage from '@src/ui/components/standard_page';
import { TextEditor } from '@src/shared/text_editor';
import { MarkdownParser } from '@/src/shared/markdown_parser';

import { LabeledTextInput } from '@src/ui/components/new_post/text_input';

import '@src/ui/css/prosemirror_editor.css';

function removeAllChildNodes(parent: Element) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export default function NewPost() {
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

  const mdp = new MarkdownParser(preview);

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

        <div dangerouslySetInnerHTML={{ __html: mdp.parseToHTMLString() }}></div>
      </div>
    </StandardPage>
  );
}