import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { BlogAPI } from '@src/api/blog_api';
import { BlogPost } from '@src/models/blog_post';
import { actions, AppDispatch } from '@src/store';

import { StandardPage } from '@src/ui/components/standard_page';
import { BlogContent } from '@src/ui/components/blog_content';

export function BlogPostPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loaded, setLoaded] = useState(false);

  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    (async function getBlogPost() {
      const bapi = new BlogAPI();

      try {
        const post = await bapi.getBlogPost(slug);
        setBlogPost(post);
      } catch (e) {
        dispatch(actions.addErrorMessage({
          message: 'Error retrieving blog post',
        }));
      }

      setLoaded(true);
    })();
  }, [slug, dispatch]);

  let content = (<div>Loading</div>);

  if (loaded && blogPost !== null) {
    content = <BlogContent blogPost={blogPost} />;
  } else if (loaded && blogPost === null) {
    content = <div></div>;
  }

  return <StandardPage>
    {content}
  </StandardPage>;
}