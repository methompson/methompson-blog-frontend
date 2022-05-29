import { BlogPost } from '@src/models/blog_post_model';
import { BlogPostCollection } from '@/src/models/blog_collection';

describe('BlogCollection', () => {
  describe('fromJSON', () => {
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

    test('Parses an array of blog posts', () => {
      const col = BlogPostCollection.fromJSON([
        input1,
        input2,
        input3,
        input4,
      ]);

      expect(col.totalPosts).toBe(4);
    });

    test('throws an error if any of the values in the array are not a blog post', () => {
      expect(() => BlogPostCollection.fromJSON([{}])).toThrow();
    });

    test('Returns an empty BlogPostCollection is the array is empty', () => {
      const col = BlogPostCollection.fromJSON([]);
      expect(col.totalPosts).toBe(0);
    });
  });
});
