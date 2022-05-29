import { getBaseApiUrl } from '@src/shared/get_base_url';
import { BlogPostCollection } from '@src/models/blog_collection';

class BlogAPI {
  async getBlogList(page = 1, pagination = 10) {
    const baseUrl = getBaseApiUrl();
    const queryParams = `page=${page}&pagination=${pagination}`;
    const url = `${baseUrl}/blog?${queryParams}`;

    const result = await fetch(url);

    const body = await result.json();

    if (!result.ok) {
      throw new Error(`Error attempting to retrieve blog: ${body}`);
    }

    return BlogPostCollection.fromJSON(body);
  }

  async getBlogPost(slug: string) {}
}

export {
  BlogAPI,
};