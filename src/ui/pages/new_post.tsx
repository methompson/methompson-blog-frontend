import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import slugify from 'slugify';

import { AppDispatch, actions } from '@src/store';
import { BlogPost, NewBlogPost } from '@/src/models/blog_post';
import { getUserId } from '@/src/shared/auth_functions';
import { Duration } from '@src/shared/duration';
import { TextEditor } from '@src/shared/text_editor';

import { CenteredStandardPage } from '@src/ui/components/standard_page';
import { LabeledTextInput } from '@src/ui/components/new_post/text_input';
import { BlogContent } from '@src/ui/components/blog_content';
import { RegularButton } from '@src/ui/components/regular_button';

function removeAllChildNodes(parent: Element) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export function NewPost() {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState('');
  const [tagsString, setTagsString] = useState('');
  const [shouldRedirectSlug, setShouldRedirectSlug] = useState('');
  const [preview, setPreview] = useState('');
  // We never change the text editor, but we want to make sure it doesn't change when
  // this is re-rendered We don't define ths above the React component because we want
  // to be able to eventually provide already created content into the TextEditor for
  // when this function allows for editing posts
  const [textEditor] = useState(new TextEditor({
    transactionCallback() {
      const content = textEditor.getMarkdownContent();
      setPreview(content);
    },
  }));

  const editorId = 'editor';

  useEffect(() => {
    const editorDiv = document.querySelector(`#${editorId}`);

    if (editorDiv === null) {
      return;
    }

    removeAllChildNodes(editorDiv);
    textEditor.makeAndInsertEditor(editorDiv);
  }, [textEditor]);

  const addNewPostAction = async () => {
    const userId = await getUserId();

    const body = textEditor.getMarkdownContent();
    const slug = slugify(title, {lower: true});

    let tags = tagsString.split(',');
    tags = tags.map((tag) => tag.trim());

    const newPost = NewBlogPost.fromJSON({
      title,
      slug,
      body,
      tags,
      authorId: userId,
      dateAdded: (new Date()).toISOString(),
    });

    try {
      const result = await dispatch(actions.addBlogPost({ newPost }));

      const bp = BlogPost.fromJSON(result.payload);

      console.log('redirection slug:', bp.slug);
      setShouldRedirectSlug(bp.slug);
    } catch(e) {
      const message = `Error Adding New Blog Post ${e}`;
      console.error(message);
      dispatch(actions.addErrorMessage({
        message,
        duration: new Duration({minutes: 1}),
      }));
    }
  };

  if (shouldRedirectSlug.length > 0) {
    return <Navigate to={`/post/${shouldRedirectSlug}`} />;
  }

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

      <div
        className='border border-slate-300 dark:border-slate-600 rounded-md'
        id={editorId} />

      <LabeledTextInput
        name='Tags'
        value={tagsString}
        stretch={true}
        onChange={(e) => setTagsString(e.target.value)} />

      <div>
        <RegularButton
          action={addNewPostAction}
          text="Submit Post" />
      </div>

      <div>Preview</div>

      <BlogContent blogPost={bp} />

    </CenteredStandardPage>
  );
}