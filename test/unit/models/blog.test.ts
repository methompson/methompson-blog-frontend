import { BlogPost, NewBlogPost } from '@/src/models/blog_post';

describe('BlogPost', () => {
  describe('constructor', () => {});

  describe('toJSON', () => {});

  describe('fromJSON', () => {
    const tags: string[] = [];
    const input1 = {
      id: '62583158430e488788971352',
      authorId: '123',
      body: 'body',
      dateAdded: '2022-04-14T08:39:00.000Z',
      slug: 'slug',
      tags,
      title: 'title',
    };

    const input2 = {
      'title': 'New Blog Title',
      'slug': 'new_blog_title2',
      'body': '**Test Bold**\n\n*Test Italics*\n\n[Test Link](https://methompson.com "Test Link")\n\n`Test Code`',
      'tags': [
        'tag1',
        'tag2',
      ],
      'authorId': 'r3NVUF0c2iTEmOe42WVIGX2WkPK2',
      'dateAdded': '2022-06-23T14:22:56.556Z',
      'id': '62b84eb652e469d71aa73f69',
    };

    test('Should parse a basic JSON object', () => {
      const bp1 = BlogPost.fromJSON(input1);

      expect(bp1.id).toBe(input1.id);
      expect(bp1.authorId).toBe(input1.authorId);
      expect(bp1.body).toBe(input1.body);
      expect(bp1.dateAdded.toISOString()).toBe(input1.dateAdded);
      expect(bp1.slug).toBe(input1.slug);
      expect(bp1.title).toBe(input1.title);

      const bp2 = BlogPost.fromJSON(input2);

      expect(bp2.id).toBe(input2.id);
      expect(bp2.authorId).toBe(input2.authorId);
      expect(bp2.body).toBe(input2.body);
      expect(bp2.dateAdded.toISOString()).toBe(input2.dateAdded);
      expect(bp2.slug).toBe(input2.slug);
      expect(bp2.title).toBe(input2.title);

    });

    test('Throws an error if the JSON data is not valid', () => {
      let i: Record<string, unknown> = { ...input1 };
      expect(() => BlogPost.fromJSON(i)).not.toThrow();

      i = { ...input1 };
      delete i.id;
      expect(() => BlogPost.fromJSON(i)).toThrow();

      i = { ...input1 };
      delete i.authorId;
      expect(() => BlogPost.fromJSON(i)).toThrow();

      i = { ...input1 };
      delete i.body;
      expect(() => BlogPost.fromJSON(i)).toThrow();

      i = { ...input1 };
      delete i.dateAdded;
      expect(() => BlogPost.fromJSON(i)).toThrow();

      i = { ...input1 };
      delete i.slug;
      expect(() => BlogPost.fromJSON(i)).toThrow();

      i = { ...input1 };
      delete i.tags;
      expect(() => BlogPost.fromJSON(i)).toThrow();

      i = { ...input1 };
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
      const newPost: Record<string, unknown> = { ...validPost };
      delete newPost.updateAuthorId;
      delete newPost.dateUpdated;

      expect(BlogPost.isBlogPostInterface(newPost)).toBe(true);
    });

    test('returns false if updateAuthorId is present, but not dateUpdated', () => {
      const newPost: Record<string, unknown> = { ...validPost };
      delete newPost.updateAuthorId;

      expect(BlogPost.isBlogPostInterface(newPost)).toBe(false);
    });

    test('returns false if dateUpdate is present, but not updateAuthorId', () => {
      const newPost: Record<string, unknown> = { ...validPost };
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
      const newPost: Record<string, unknown> = { ...validPost };
      delete newPost.updateAuthorId;
      delete newPost.dateUpdated;

      expect(NewBlogPost.isNewBlogPostInterface(newPost)).toBe(true);
    });

    test('returns false if updateAuthorId is present, but not dateUpdated', () => {
      const newPost: Record<string, unknown> = { ...validPost };
      delete newPost.updateAuthorId;

      expect(NewBlogPost.isNewBlogPostInterface(newPost)).toBe(false);
    });

    test('returns false if dateUpdate is present, but not updateAuthorId', () => {
      const newPost: Record<string, unknown> = { ...validPost };
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
