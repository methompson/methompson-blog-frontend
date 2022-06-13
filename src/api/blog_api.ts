import { getBaseApiUrl } from '@src/shared/get_base_url';
import { BlogPostCollection } from '@src/models/blog_collection';
import { BlogPost } from '@src/models/blog_post';
import { getErrorByStatus } from '../errors/http_error';

class BlogAPI {
  async getBlogList(page = 1, pagination = 10) {
    const baseUrl = getBaseApiUrl();
    const queryParams = `page=${page}&pagination=${pagination}`;
    const url = `${baseUrl}/blog?${queryParams}`;

    const result = await fetch(url);

    if (!result.ok) {
      throw getErrorByStatus(result.status, 'Error attempting to retrieve blog post');
    }

    const body = await result.json();

    return BlogPostCollection.fromJSON(body);
  }

  async getBlogPost(slug: string) {
    const baseUrl = getBaseApiUrl();
    const url = `${baseUrl}/blog/${slug}`;

    const result = await fetch(url);

    if (!result.ok) {
      throw getErrorByStatus(result.status, 'Error attempting to retrieve blog post');
    }

    const body = await result.json();

    return BlogPost.fromJSON(body);
  }
}

export {
  BlogAPI,
};