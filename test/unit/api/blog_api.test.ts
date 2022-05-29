import { BlogAPI } from '@src/api/blog_api';

import { makeFetchWithError, makeFetchWithResponse } from '@/test/util/make_fetch_mock';

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

describe('BlogCollection', () => {
  describe('getBlogList', () => {
    test('Calls fetch and json on the response', async () => {
      const res = <unknown[]>[];
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
      const { fetch } = makeFetchWithResponse(res);

      global.fetch = fetch;

      const bap = new BlogAPI();
      const result = await bap.getBlogList();

      expect(result.getBySlug(input1.slug).slug).toBe(input1.slug);
      expect(result.getBySlug(input2.slug).slug).toBe(input2.slug);
      expect(result.getBySlug(input3.slug).slug).toBe(input3.slug);
      expect(result.getBySlug(input4.slug).slug).toBe(input4.slug);
    });

    test('throws an error if fetch throws an error', async () => {
      const { fetch } = makeFetchWithError(new Error('Test Error'));

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogList()).rejects.toThrow('Test Error');
    });

    test('throws an error if the response is not a 2XX response', async () => {
      const res = {
        error: 'Unable to connect to the Database',
      };

      const { fetch } = makeFetchWithResponse(res, 500);

      global.fetch = fetch;

      const bap = new BlogAPI();
      expect(() => bap.getBlogList()).rejects.toThrow('Error attempting to retrieve blog');
    });
  });
});