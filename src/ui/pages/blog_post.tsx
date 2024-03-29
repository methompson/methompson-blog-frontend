import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { BlogPost, BlogStatus } from '@/src/models/blog_post';
import { actions, AppDispatch, selectors } from '@/src/store';

import { CenteredStandardPage } from '@/src/ui/components/standard_page';
import { BlogContent } from '@/src/ui/components/blog_content';
import { FullHeightCard } from '@/src/ui/components/card';

export function BlogPostPage() {
  const isLoggedIn = useSelector(selectors.isLoggedIn);

  const dispatch = useDispatch<AppDispatch>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loaded, setLoaded] = useState(false);

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

  let content = (<div>Loading</div>);

  // Can show if blogPost is not null and blog status is Posted or the user is logged in
  const canShowBlogpost = blogPost !== null && (
    blogPost.status === BlogStatus.Posted || isLoggedIn);

  if (loaded && canShowBlogpost) {
    content = <BlogContent blogPost={blogPost} showUpdateButton={isLoggedIn} />;
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
  </CenteredStandardPage>;
}