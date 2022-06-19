import React, { useEffect, useState } from 'react';

import { BlogAPI } from '@src/api/blog_api';
import { BlogPostCollection } from '@src/models/blog_collection';
import { StandardPage } from '@src/ui/components/standard_page';
import { BlogCard } from '@/src/ui/components/blog_content';

export function Home() {
  const [blogPosts, setBlogPosts] = useState(new BlogPostCollection({}));

  useEffect(() => {
    (async function getBlogPosts() {
      const bapi = new BlogAPI();

      try {
        const collection = await bapi.getBlogList();
        setBlogPosts(collection);
      } catch (e) {}
    })();
  }, []);

  const blogComponents = blogPosts.list.map((bp) => <BlogCard key={bp.id} blogPost={bp} />);

  return (
    <StandardPage>
      <div>
        {blogComponents}
      </div>
    </StandardPage>
  );
}