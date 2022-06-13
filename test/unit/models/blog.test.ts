import { BlogPost, NewBlogPost } from '@/src/models/blog_post';

describe('BlogPost', () => {
  describe('constructor', () => {});

  describe('toJSON', () => {});

  describe('fromJSON', () => {
    const tags: string[] = [];
    const input = {
      id: '62583158430e488788971352',
      authorId: '123',
      body: 'body',
      dateAdded: '2022-04-14T08:39:00.000Z',
      slug: 'slug',
      tags,
      title: 'title',
    };

    test('Should parse a basic JSON object', () => {
      const bp = BlogPost.fromJSON(input);

      expect(bp.id).toBe(input.id);
      expect(bp.authorId).toBe(input.authorId);
      expect(bp.body).toBe(input.body);
      expect(bp.dateAdded.toISOString()).toBe(input.dateAdded);
      expect(bp.slug).toBe(input.slug);
      expect(bp.title).toBe(input.title);
    });

    test('Throws an error if the JSON data is not valid', () => {
      let i = { ...input };
      expect(() => BlogPost.fromJSON(i)).not.toThrow();

      i = { ...input };
      delete i.id;
      expect(() => BlogPost.fromJSON(i)).toThrow();

      i = { ...input };
      delete i.authorId;
      expect(() => BlogPost.fromJSON(i)).toThrow();

      i = { ...input };
      delete i.body;
      expect(() => BlogPost.fromJSON(i)).toThrow();

      i = { ...input };
      delete i.dateAdded;
      expect(() => BlogPost.fromJSON(i)).toThrow();

      i = { ...input };
      delete i.slug;
      expect(() => BlogPost.fromJSON(i)).toThrow();

      i = { ...input };
      delete i.tags;
      expect(() => BlogPost.fromJSON(i)).toThrow();

      i = { ...input };
      delete i.title;
      expect(() => BlogPost.fromJSON(i)).toThrow();
    });
  });

  describe('isBlogPostInterface', () => {
    const validPost = {
      id: 'id',
      title: 'title',
      slug: 'slug',
      body: 'body',
      tags: ['tag1', 'tag2'],
      authorId: 'authorId',
      dateAdded: '2022-04-14T08:05:00.000Z',
      updateAuthorId: 'updateAuthorId',
      dateUpdated: '2022-04-14T08:06:00.000Z',
    };

    test('returns true if the input conforms to a BlogPostInterface', () => {
      expect(BlogPost.isBlogPostInterface(validPost)).toBe(true);
    });

    test('returns true if update information is missing', () => {
      const newPost = { ...validPost };
      delete newPost.updateAuthorId;
      delete newPost.dateUpdated;

      expect(BlogPost.isBlogPostInterface(newPost)).toBe(true);
    });

    test('returns false if updateAuthorId is present, but not dateUpdated', () => {
      const newPost = { ...validPost };
      delete newPost.updateAuthorId;

      expect(BlogPost.isBlogPostInterface(newPost)).toBe(false);
    });

    test('returns false if dateUpdate is present, but not updateAuthorId', () => {
      const newPost = { ...validPost };
      delete newPost.dateUpdated;

      expect(BlogPost.isBlogPostInterface(newPost)).toBe(false);
    });

    test('returns false if any of the required values are missing', () => {
      let alias: Record<string, unknown>;

      alias = { ...validPost };
      delete alias.id;
      expect(BlogPost.isBlogPostInterface(alias)).toBe(false);

      alias = { ...validPost };
      delete alias.title;
      expect(BlogPost.isBlogPostInterface(alias)).toBe(false);

      alias = { ...validPost };
      delete alias.slug;
      expect(BlogPost.isBlogPostInterface(alias)).toBe(false);

      alias = { ...validPost };
      delete alias.body;
      expect(BlogPost.isBlogPostInterface(alias)).toBe(false);

      alias = { ...validPost };
      delete alias.authorId;
      expect(BlogPost.isBlogPostInterface(alias)).toBe(false);

      alias = { ...validPost };
      delete alias.dateAdded;
      expect(BlogPost.isBlogPostInterface(alias)).toBe(false);

      alias = { ...validPost };
      delete alias.tags;
      expect(BlogPost.isBlogPostInterface(alias)).toBe(false);
    });
  });
});

describe('NewBlogPost', () => {
  describe('constructor', () => {});

  describe('toJSON', () => {});

  describe('fromJSON', () => {});

  describe('isNewBlogPostInterface', () => {
    const validPost = {
      title: 'title',
      slug: 'slug',
      body: 'body',
      tags: ['tag1', 'tag2'],
      authorId: 'authorId',
      dateAdded: '2022-04-14T08:05:00.000Z',
      updateAuthorId: 'updateAuthorId',
      dateUpdated: '2022-04-14T08:06:00.000Z',
    };

    test('returns true if the input conforms to a NewBlogPostInterface', () => {
      expect(NewBlogPost.isNewBlogPostInterface(validPost)).toBe(true);
    });

    test('returns true if update information is missing', () => {
      const newPost = { ...validPost };
      delete newPost.updateAuthorId;
      delete newPost.dateUpdated;

      expect(NewBlogPost.isNewBlogPostInterface(newPost)).toBe(true);
    });

    test('returns false if updateAuthorId is present, but not dateUpdated', () => {
      const newPost = { ...validPost };
      delete newPost.updateAuthorId;

      expect(NewBlogPost.isNewBlogPostInterface(newPost)).toBe(false);
    });

    test('returns false if dateUpdate is present, but not updateAuthorId', () => {
      const newPost = { ...validPost };
      delete newPost.dateUpdated;

      expect(NewBlogPost.isNewBlogPostInterface(newPost)).toBe(false);
    });

    test('returns false if any of the required values are missing', () => {
      let alias: Record<string, unknown>;

      alias = { ...validPost };
      delete alias.title;
      expect(NewBlogPost.isNewBlogPostInterface(alias)).toBe(false);

      alias = { ...validPost };
      delete alias.slug;
      expect(NewBlogPost.isNewBlogPostInterface(alias)).toBe(false);

      alias = { ...validPost };
      delete alias.body;
      expect(NewBlogPost.isNewBlogPostInterface(alias)).toBe(false);

      alias = { ...validPost };
      delete alias.authorId;
      expect(NewBlogPost.isNewBlogPostInterface(alias)).toBe(false);

      alias = { ...validPost };
      delete alias.dateAdded;
      expect(NewBlogPost.isNewBlogPostInterface(alias)).toBe(false);

      alias = { ...validPost };
      delete alias.tags;
      expect(NewBlogPost.isNewBlogPostInterface(alias)).toBe(false);
    });

    test('returns false if dateAdded is not a valid timestamp', () => {
      const alias = { ...validPost };
      alias.dateAdded = 'abc';
      expect(NewBlogPost.isNewBlogPostInterface(alias)).toBe(false);
    });
  });
});
