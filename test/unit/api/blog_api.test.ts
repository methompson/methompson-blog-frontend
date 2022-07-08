import { BlogAPI } from '@src/api/blog_api';

import { makeFetchWithError, makeFetchWithResponse } from '@/test/util/make_fetch_mock';
import { Http400Error, Http500Error, HttpBadRequestError, HttpForbiddenError, HttpGatewayTimeoutError, HttpInternalServerError, HttpNotFoundError, HttpServiceUnavailableError, HttpUnauthorizedError } from '@/src/errors/http_error';

global.fetch = jest.fn();

const baseUrl = 'abc';
jest.mock('@src/shared/get_base_url', () => ({
  getBaseApiUrl() {
    return baseUrl;
  },
}));

const input1 = {
  id: '62583158430e488788971352',
  authorId: '123',
  body: 'body',
  dateAdded: '2022-04-14T08:39:00.000Z',
  slug: 'slug',
  tags: <string[]>[],
  title: 'title',
};
const input2 = {
  ...input1,
  slug: 'slug2',
};
const input3 = {
  ...input1,
  slug: 'slug3',
};
const input4 = {
  ...input1,
  slug: 'slug4 ',
};

describe('BlogAPI', () => {
  describe('getBlogList', () => {
    test('Calls fetch and json on the response', async () => {
      const res = { posts: <unknown[]>[], morePages: true };
      const { fetch, response } = makeFetchWithResponse(res);

      global.fetch = fetch;

      const bap = new BlogAPI();
      await bap.getBlogList();

      const url = `${baseUrl}/blog?page=1&pagination=10`;

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(url);
      expect(response.json).toHaveBeenCalledTimes(1);
    });

    test('returns a BlogPostCollection with values from the response', async () => {
      const res = [input1, input2, input3, input4];
      const { fetch } = makeFetchWithResponse({posts: res});

      global.fetch = fetch;

      const bap = new BlogAPI();
      const result = await bap.getBlogList();

      expect(result.posts.getBySlug(input1.slug).slug).toBe(input1.slug);
      expect(result.posts.getBySlug(input2.slug).slug).toBe(input2.slug);
      expect(result.posts.getBySlug(input3.slug).slug).toBe(input3.slug);
      expect(result.posts.getBySlug(input4.slug).slug).toBe(input4.slug);
    });

    test('throws an error if fetch throws an error', async () => {
      const { fetch } = makeFetchWithError(new Error('Test Error'));

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogList()).rejects.toThrow('Test Error');
    });

    test('throws an error if the response is a 400 response', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 400);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogList()).rejects.toThrow(HttpBadRequestError);
    });

    test('throws an error if the response is a 401 response', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 401);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogList()).rejects.toThrow(HttpUnauthorizedError);
    });

    test('throws an error if the response is a 403 response', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 403);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogList()).rejects.toThrow(HttpForbiddenError);
    });

    test('throws an error if the response is a 404 response', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 404);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogList()).rejects.toThrow(HttpNotFoundError);
    });

    test('throws an error if the response is a 500 response', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 500);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogList()).rejects.toThrow(HttpInternalServerError);
    });

    test('throws an error if the response is a 503 response', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 503);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogList()).rejects.toThrow(HttpServiceUnavailableError);
    });

    test('throws an error if the response is a 504 response', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 504);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogList()).rejects.toThrow(HttpGatewayTimeoutError);
    });

    test('throws an error if the response is in the 400 response range, but not a specific number', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 499);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogList()).rejects.toThrow(Http400Error);
    });

    test('throws an error if the response is in the 500 response range, but not a specific number', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 599);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogList()).rejects.toThrow(Http500Error);
    });
  });

  describe('getBlogPost', () => {
    const testSlug = 'test slug apoidfsln';

    test('Calls fetch and json on the response', async () => {
      const res = input1;
      const { fetch, response } = makeFetchWithResponse(res);

      global.fetch = fetch;

      const bap = new BlogAPI();
      await bap.getBlogPost(testSlug);

      const url = `${baseUrl}/blog/${testSlug}`;

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(url);
      expect(response.json).toHaveBeenCalledTimes(1);
    });

    test('returns a BlogPost object with values from the response', async () => {
      const res = input1;
      const { fetch } = makeFetchWithResponse(res);

      global.fetch = fetch;

      const bap = new BlogAPI();
      const result = await bap.getBlogPost(testSlug);

      expect(result.slug).toBe(input1.slug);
      expect(result.id).toBe(input1.id);
      expect(result.authorId).toBe(input1.authorId);
      expect(result.body).toBe(input1.body);
      expect(result.dateAdded.toISOString()).toBe(input1.dateAdded);
      expect(result.title).toBe(input1.title);
      expect(result.tags).toStrictEqual(input1.tags);
    });

    test('throws an error if fetch throws an error', async () => {
      const { fetch } = makeFetchWithError(new Error('Test Error'));

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogPost(testSlug)).rejects.toThrow('Test Error');
    });

    test('throws an error if the response is a 400 response', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 400);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogPost(testSlug)).rejects.toThrow(HttpBadRequestError);
    });

    test('throws an error if the response is a 401 response', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 401);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogPost(testSlug)).rejects.toThrow(HttpUnauthorizedError);
    });

    test('throws an error if the response is a 403 response', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 403);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogPost(testSlug)).rejects.toThrow(HttpForbiddenError);
    });

    test('throws an error if the response is a 404 response', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 404);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogPost(testSlug)).rejects.toThrow(HttpNotFoundError);
    });

    test('throws an error if the response is a 500 response', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 500);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogPost(testSlug)).rejects.toThrow(HttpInternalServerError);
    });

    test('throws an error if the response is a 503 response', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 503);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogPost(testSlug)).rejects.toThrow(HttpServiceUnavailableError);
    });

    test('throws an error if the response is a 504 response', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 504);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogPost(testSlug)).rejects.toThrow(HttpGatewayTimeoutError);
    });

    test('throws an error if the response is in the 400 response range, but not a specific number', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 499);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogPost(testSlug)).rejects.toThrow(Http400Error);
    });

    test('throws an error if the response is in the 500 response range, but not a specific number', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 599);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogPost(testSlug)).rejects.toThrow(Http500Error);
    });
  });
});