import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { actions, AppDispatch } from '@src/store';
import { BlogPostCollection } from '@src/models/blog_collection';
import { CenteredStandardPage } from '@src/ui/components/standard_page';
import { BlogCard } from '@/src/ui/components/blog_content';

export function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const [blogPosts, setBlogPosts] = useState(new BlogPostCollection({}));

  useEffect(() => {
    (async function getBlogPosts() {
      try {
        const collection = (await dispatch(actions.getBlogList({}))).payload;
        const blogCollection = BlogPostCollection.fromJSON(collection);
        setBlogPosts(blogCollection);
      } catch (e) {
        // TODO display an error message
      }
    })();
  }, [dispatch]);

  const blogComponents = blogPosts.list.map((bp) => <BlogCard key={bp.id} blogPost={bp} />);

  return (
    <CenteredStandardPage>
      {blogComponents}
    </CenteredStandardPage>
  );
}