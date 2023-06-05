import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppDispatch, actions } from '@/src/store';

import { BlogPost, NewBlogPost } from '@/src/models/blog_post';

import { Duration } from '@/src/shared/duration';
import { messengerInstance } from '@/src/shared/messenger';

import { AuthenticationGuard } from '@/src/ui/components/navigation_guard';
import { PostEditSection, SubmitPostInterface } from '@/src/ui/components/post_edit_section';
import { CenteredStandardPage } from '@/src/ui/components/standard_page';

export function NewPost() {
  const dispatch = useDispatch<AppDispatch>();

  const [shouldRedirectSlug, setShouldRedirectSlug] = useState('');

  async function submitPostAction(post: SubmitPostInterface) {
    try {
      const newPost = NewBlogPost.fromJSON({
        title: post.title,
        slug: post.slug,
        body: post.body,
        tags: post.tags,
        authorId: post.authorId,
        status: post.status,
        dateAdded: post.dateAdded,
      });

      const result = await dispatch(actions.addBlogPost({ newPost }));

      const bp = BlogPost.fromJSON(result.payload);

      setShouldRedirectSlug(bp.slug);

    } catch (e) {
      const message = `Error Adding New Blog Post ${e}`;
      messengerInstance.addErrorMessage({
        message,
        duration: new Duration({minutes: 1}),
      });
    }
  }

  if (shouldRedirectSlug.length > 0) {
    return <Navigate to={`/post/${shouldRedirectSlug}`} />;
  }

  return <AuthenticationGuard>
    <CenteredStandardPage>
      <PostEditSection submitPostAction={submitPostAction}/>
    </CenteredStandardPage>
  </AuthenticationGuard>;
}