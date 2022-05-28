import { BlogPost } from '@src/models/blog';
import { InvalidInputError } from '@src/errors/invalid_input_error';

interface BlogPostCollectionInterface {
  blogPostCollection: Record<string, BlogPost>;
}

class BlogPostCollection {
  constructor(
    protected _blogPostCollection: Record<string, BlogPost>,
  ) {}

  static fromJSON(input: unknown) {
    if (!Array.isArray(input)) {
      throw new InvalidInputError('Invalid Blog Post Collection received');
    }

    const output: Record<string, BlogPost> = {};

    for (const i of input) {
      const post = BlogPost.fromJSON(i);

      output[post.id] = post;
    }

    return new BlogPostCollection(output);
  }
}

export {
  BlogPostCollection as BlogCollection,
};