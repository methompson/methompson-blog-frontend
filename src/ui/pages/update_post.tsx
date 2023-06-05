import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { BlogPost } from '@/src/models/blog_post';
import { actions, AppDispatch, selectors } from '@/src/store';

import { Duration } from '@/src/shared/duration';
import { getUserId } from '@/src/shared/auth_functions';
import { messengerInstance } from '@/src/shared/messenger';

import { CenteredStandardPage } from '@/src/ui/components/standard_page';
import { PostEditSection, SubmitPostInterface } from '@/src/ui/components/post_edit_section';
import { AuthenticationGuard } from '@/src/ui/components/navigation_guard';
import { isNullOrUndefined, isRecord, isString } from '@/src/shared/type_guards';

export interface UpdatePostPageProps {
  blogPost?: BlogPost;
}

export function UpdatePostPage(props?: UpdatePostPageProps) {
  const navigate = useNavigate();

  const [blogPost, setBlogPost] = useState<BlogPost | undefined>(props?.blogPost);
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const params = useParams();
  const slug = params.slug ?? '';

  useEffect(
    () => {
      (async function getBlogPost() {
        const passedPost = props?.blogPost;
        if (passedPost) {
          setBlogPost(passedPost);
        } else {
          try {
            const post = (await dispatch(actions.getBlogPost({ slug }))).payload;
            setBlogPost(BlogPost.fromJSON(post));
          } catch(e) {
            // Display an error if here
            // dispatch(actions.addErrorMessage({
            //   message: 'Error retrieving blog post',
            // }));
          }
        }

        setLoaded(true);
      })();
    },
    [props, slug, dispatch],
  );

  async function submitPostAction(post: SubmitPostInterface) {
    const id = post.id;

    if (isNullOrUndefined(id)) {
      messengerInstance.addErrorMessage({
        message: 'Invalid Post. No ID available',
        duration: new Duration({minutes: 1}),
      });
    }

  try {
    const userId = await getUserId();

    const updatedPost = BlogPost.fromJSON({
      id,
      title: post.title,
      slug: post.slug,
      body: post.body,
      tags: post.tags,
      authorId: post.authorId,
      status: post.status,
      dateAdded: post.dateAdded,
      updateAuthorId: userId,
      dateUpdated: new Date().toISOString(),
    });

    const result = await dispatch(actions.updateBlogPost({ oldSlug: slug, post: updatedPost }))
      .unwrap();

    const bp = BlogPost.fromJSON(result);

    navigate(`/post/${bp.slug}`);
  } catch (e) {
    let errorMessage = `${e}`;

      if (isRecord(e) && isString(e.message)) {
        errorMessage = e.message;
      }

    const message = `Error Adding New Blog Post ${errorMessage}`;
    messengerInstance.addErrorMessage({
      message,
      duration: new Duration({minutes: 1}),
    });
  }
  }

  if (!loaded) {
    return <CenteredStandardPage>
      Loading
    </CenteredStandardPage>;
  }

  return <AuthenticationGuard>
    <CenteredStandardPage>
      <PostEditSection
        blogPost={blogPost}
        submitPostAction={submitPostAction}/>
    </CenteredStandardPage>
  </AuthenticationGuard>;
}