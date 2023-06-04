import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';

import { BlogPost, BlogStatus } from '@/src/models/blog_post';
import { actions, AppDispatch, selectors } from '@/src/store';
import { Duration } from '@/src/shared/duration';

import { CenteredStandardPage } from '@/src/ui/components/standard_page';
import { BlogContent } from '@/src/ui/components/blog_content';
import { FullHeightCard } from '@/src/ui/components/card';
import { DeletePostButton } from '@/src/ui/components/delete_post_button';
import { messengerInstance } from '@/src/shared/messenger';

export function BlogPostPage() {
  const isLoggedIn = useSelector(selectors.isLoggedIn);

  const dispatch = useDispatch<AppDispatch>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [shouldRedirectHome, setShouldRedirectHome] = useState(false);

  const params = useParams();
  const slug = params.slug ?? '';

  useEffect(() => {
    (async function getBlogPost() {
      try {
        const post = (await dispatch(actions.getBlogPost({ slug }))).payload;
        setBlogPost(BlogPost.fromJSON(post));
      } catch(e) {
        // Display an error if here
        // dispatch(actions.addErrorMessage({
        //   message: 'Error retrieving blog post',
        // }));
      }

      setLoaded(true);
    })();
  }, [slug, dispatch]);

  if (shouldRedirectHome) {
    return <Navigate to={'/'} />;
  }

  let content = (<div>Loading</div>);
  let deleteButton = null;

  // Can show if blogPost is not null and blog status is Posted or the user is logged in
  const canShowBlogpost = blogPost !== null && (
    blogPost.status === BlogStatus.Posted || isLoggedIn);

  const deletePost = async () => {
    try {
      await dispatch(actions.deleteBlogPost(slug));
      messengerInstance.addSuccessMessage({
        message: 'Post Deleted',
        duration: new Duration({minutes: 1}),
      });
      setShouldRedirectHome(true);
    } catch (e) {
      const message = `Error Deleting Blog Post ${e}`;
      messengerInstance.addErrorMessage({
        message,
        duration: new Duration({minutes: 1}),
      });
    }
  };

  if (loaded && canShowBlogpost) {
    content = <BlogContent blogPost={blogPost} />;

    deleteButton = isLoggedIn
    ? <DeletePostButton action={deletePost} />
    : null;
  } else if (loaded) {
    // TODO redirect to 404 or show 404
    content = (<div>
      This Blog Post does not exist.
    </div>);
  }

  return <CenteredStandardPage>
    <FullHeightCard>
      {content}
    </FullHeightCard>
    <div className='centeredPageContainer'>
      {deleteButton}
    </div>
  </CenteredStandardPage>;
}