import { BlogPost, BlogPostInterface } from '@/src/models/blog_post';
import { InvalidInputError } from '@src/errors/invalid_input_error';
import { NoResultError } from '@src/errors/no_result_error';

class BlogPostCollection {
  constructor(
    protected _blogPostCollection: Record<string, BlogPost>,
  ) {}

  get totalPosts() {
    return Object.keys(this._blogPostCollection).length;
  }

  get list() {
    return Object.values(this._blogPostCollection);
  }

  get sortedList() {
    const list = this.list;
    list.sort((a, b) => {
      const aTime = a.dateAdded.getTime();
      const bTime = b.dateAdded.getTime();
      if (aTime < bTime) return -1;
      if (aTime > bTime) return 1;
      return 0;
    });

    return list;
  }

  getBySlug(slug: string): BlogPost {
    const post = this._blogPostCollection[slug];

    if (post === null) {
      throw new NoResultError(`${slug} is not a valid slug`);
    }

    return post;
  }

  toJSON(): BlogPostInterface[] {
    const output: BlogPostInterface[] = [];

    for (const post of this.list) {
      output.push(post.toJSON());
    }

    return output;
  }

  static fromJSON(input: unknown) {
    if (!Array.isArray(input)) {
      throw new InvalidInputError('Invalid Blog Post Collection received');
    }

    const output: Record<string, BlogPost> = {};

    for (const i of input) {
      const post = BlogPost.fromJSON(i);

      output[post.slug] = post;
    }

    return new BlogPostCollection(output);
  }
}

export {
  BlogPostCollection,
};