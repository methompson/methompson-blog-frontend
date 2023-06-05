import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import slugify from 'slugify';

import { BlogPost, BlogStatus } from '@/src/models/blog_post';
import { getUserId } from '@/src/shared/auth_functions';
import { Duration } from '@/src/shared/duration';
import { TextEditor } from '@/src/shared/text_editor';
import { actions, AppDispatch } from '@/src/store';

import { LabeledTextInput } from '@/src/ui/components/new_post/text_input';
import { BlogContent } from '@/src/ui/components/blog_content';
import { RegularButton } from '@/src/ui/components/regular_button';
import { messengerInstance } from '@/src/shared/messenger';
import { isRecord, isString } from '@/src/shared/type_guards';

function removeAllChildNodes(parent: Element) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export interface SubmitPostInterface {
  id?: string;
  title: string;
  slug: string;
  body: string;
  tags: string[];
  authorId: string;
  status: string;
  dateAdded:string;
}

export interface PostEditSectionProps {
  blogPost?: BlogPost;
  submitPostAction: (post: SubmitPostInterface) => void | Promise<void>
}

function DeleteButton(props: { slug: string; }) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const deletePostAction = async () => {
    try {
      await dispatch(actions.deleteBlogPost(props.slug)).unwrap();

      messengerInstance.addSuccessMessage({
        message: 'Post Deleted',
        duration: new Duration({minutes: 1}),
      });

      navigate('/');
    } catch (e) {
      let errorMessage = `${e}`;

      if (isRecord(e) && isString(e.message)) {
        errorMessage = e.message;
      }

      const message = `Error Deleting Blog Post: ${errorMessage}`;
      messengerInstance.addErrorMessage({
        message,
        duration: new Duration({minutes: 1}),
      });
    }
  };

  const [showModal, setShowModal] = useState(false);

  const modal = showModal
    ? <div
      className='absolute right-0 bottom-12 border-2 p-2 my-4 bg-white border-slate-500 sm:w-1/2'
    >
      Are you sure you want to delete this blog post?<br />
      This action cannot be undone.

      <div className='flex justify-between pt-2'>
        <RegularButton action={deletePostAction} text='Confirm' />
        <RegularButton
          action={() => {
            setShowModal(false);
          }}
          classes='bg-green-500'
          text='Cancel' />
      </div>
    </div>
    : null;

  // return <div className='relative'>
  return <div className='flex flex-row-reverse relative grow'>
    {modal}
    <RegularButton
      action={() => {
        setShowModal(true);
      }}
      text="Delete Post" />
  </div>;
}

export function PostEditSection(props: PostEditSectionProps) {
  const [originalSlug] = useState(props?.blogPost?.slug ?? '');

  const [title, setTitle] = useState(props?.blogPost?.title ?? '');
  const [tagsString, setTagsString] = useState(props?.blogPost?.tags?.join(', ') ?? '');
  const [preview, setPreview] = useState('');
  const [draft, setDraft] = useState(props?.blogPost?.status === BlogStatus.Draft ?? false);

  // We never change the text editor, but we want to make sure it doesn't change when
  // this is re-rendered We don't define ths above the React component because we want
  // to be able to eventually provide already created content into the TextEditor for
  // when this function allows for editing posts
  const [textEditor] = useState(new TextEditor({
    inputText: props?.blogPost?.body,
    transactionCallback() {
      const content = textEditor.getMarkdownContent();
      setPreview(content);
    },
  }));

  const editorId = 'editor';

  // On load, we remove all children of the editor and then add a new Text editor
  // TODO comment everything below to learn why.
  useEffect(() => {
    const editorDiv = document.querySelector(`#${editorId}`);

    if (editorDiv === null) {
      return;
    }

    removeAllChildNodes(editorDiv);
    textEditor.makeAndInsertEditor(editorDiv);

    setPreview(textEditor.getMarkdownContent());
  }, [textEditor]);

  const submitPostAction = async () => {
    if (title.length === 0) {
      messengerInstance.addErrorMessage({
        message: 'Blog Title is required',
        duration: new Duration({minutes: 1}),
      });

      return;
    }

    const userId = await getUserId();
    if (!isString(userId)) {
      messengerInstance.addErrorMessage({
        message: 'Invalid User Id',
        duration: new Duration({minutes: 1}),
      });

      return;
    }

    const body = textEditor.getMarkdownContent();
    const slug = slugify(title, {lower: true});

    const tags = tagsString
      .split(',')
      .map((tag) => tag.trim());

    const status = draft ? 'draft' : 'posted';

    const dateAdded = props.blogPost?.dateAdded.toISOString()
      ?? (new Date()).toISOString();

    const id = props.blogPost?.id;

    props.submitPostAction({
      id,
      title,
      slug,
      body,
      tags,
      authorId: userId,
      status,
      dateAdded,
    });
  };

  const bp = BlogPost.forPreview({
    title,
    body: preview,
  });

  const checkHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.checked);
    setDraft(!draft);
  };

  let deleteButton = null;

  if (originalSlug.length > 0) {
    deleteButton = <DeleteButton slug={originalSlug} />;
  }

  return (
    <span>
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

      <div className="py-2">
        <input
          type="checkbox"
          id="draft"
          name="draft"
          onChange={checkHandler}
          checked={draft} />
        <label className="px-2" htmlFor="draft">Draft</label>
      </div>

      <div className='flex flex-row w-full justify-between'>
        <RegularButton
          action={submitPostAction}
          text="Submit Post" />
        {deleteButton}
      </div>

      <div>Preview</div>

      <BlogContent blogPost={bp} />
    </span>
  );
}