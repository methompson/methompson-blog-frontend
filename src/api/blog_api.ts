import { getAuth } from 'firebase/auth';

import { getApiUrlBase } from '@/src/shared/get_base_url';

import { BlogPostCollection } from '@/src/models/blog_collection';
import { BlogPost, NewBlogPost } from '@/src/models/blog_post';

import { AddBlogError } from '@/src/errors/blog_errors';
import { getErrorByStatus } from '@/src/errors/http_error';

import { getAuthToken } from '@/src/shared/auth_functions';
import { isString } from '@/src/shared/type_guards';

class BlogAPI {
  async getBlogList(page = 1, pagination = 10) {
    const baseUrl = getApiUrlBase();
    const queryParams = `page=${page}&pagination=${pagination}`;
    const url = `${baseUrl}/api/blog?${queryParams}`;

    const result = await fetch(url);

    if (!result.ok) {
      throw getErrorByStatus(
        result.status,
        'Error attempting to retrieve blog post',
      );
    }

    const body = await result.json();

    // console.log('body', body);

    const posts = BlogPostCollection.fromJSON(body.posts);

    return {
      posts,
      morePages: body.morePages ?? false,
    };
  }

  async getFullBlogList(page = 1, pagination = 10) {
    const baseUrl = getApiUrlBase();
    const queryParams = `page=${page}&pagination=${pagination}`;
    const url = `${baseUrl}/api/blog/allPosts?${queryParams}`;

    const token = await getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      authorization: token,
    };

    const result = await fetch(url, {
      headers,
    });

    if (!result.ok) {
      throw getErrorByStatus(
        result.status,
        'Error attempting to retrieve blog post',
      );
    }

    const body = await result.json();

    // console.log('body', body);

    const posts = BlogPostCollection.fromJSON(body.posts);

    return {
      posts,
      morePages: body.morePages ?? false,
    };
  }

  async getBlogPost(slug: string) {
    const baseUrl = getApiUrlBase();
    const url = `${baseUrl}/api/blog/${slug}`;

    const result = await fetch(url);

    if (!result.ok) {
      throw getErrorByStatus(
        result.status,
        'Error attempting to retrieve blog post',
      );
    }

    const body = await result.json();

    return BlogPost.fromJSON(body);
  }

  async addBlogPost(newPost: NewBlogPost) {
    const baseUrl = getApiUrlBase();
    const url = `${baseUrl}/api/blog`;

    const token = await getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      authorization: token,
    };

    const body = JSON.stringify(newPost.toJSON());

    const resp = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    const json = await resp.json();

    if (!resp.ok) {
      const errMsg = json.message;
      const msg: string = isString(errMsg) ? errMsg : 'Unknown Error';

      throw new AddBlogError(msg);
    }

    return BlogPost.fromJSON(json);
  }

  async deleteBlogPost(slug: string) {
    const baseUrl = getApiUrlBase();
    const url = `${baseUrl}/api/blog/delete/${slug}`;

    const token = await getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      authorization: token,
    };

    const resp = await fetch(url, {
      method: 'POST',
      headers,
    });

    const json = await resp.json();

    if (!resp.ok) {
      const errMsg = json.message;
      const msg: string = isString(errMsg) ? errMsg : 'Unknown Error';

      throw new AddBlogError(msg);
    }
  }

  async updateBlogPost(oldSlug: string, post: BlogPost): Promise<BlogPost> {
    const baseUrl = getApiUrlBase();
    const url = `${baseUrl}/api/blog/update`;

    const token = await getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      authorization: token,
    };

    const body = JSON.stringify({
      updatedPost: post.toJSON(),
      oldSlug,
    });

    const resp = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    const json = await resp.json();

    if (!resp.ok) {
      const errMsg = json.message;
      const msg: string = isString(errMsg) ? errMsg : 'Unknown Error';

      throw new AddBlogError(msg);
    }

    return BlogPost.fromJSON(json);
  }
}

export { BlogAPI };
