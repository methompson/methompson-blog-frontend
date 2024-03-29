import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';

import { BlogAPI } from '@/src/api/blog_api';
import { BlogPost, BlogPostInterface, NewBlogPost } from '@/src/models/blog_post';
import { isBoolean } from '@/src/shared/type_guards';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {},
  reducers: {},
});

interface GetBlogPostRequest {
  slug: string;
}

const getBlogPost = createAsyncThunk<BlogPostInterface | null, GetBlogPostRequest>(
  'blog/getBlogPost',
  async (getBlogPostRequest: GetBlogPostRequest): Promise<BlogPostInterface | null> => {
    const bapi = new BlogAPI();
    try {
      const post = await bapi.getBlogPost(getBlogPostRequest.slug);
      return post.toJSON();
    } catch (e) {
      // TODO log an error
      // And throw an error so that the UI can respond
      return null;
    }
  },
);

interface GetBlogListRequest {
  page?: number;
  pagination?: number;
}

interface GetBlogListOutput {
  posts: BlogPostInterface[],
  morePages: boolean,
}

const getBlogList = createAsyncThunk<GetBlogListOutput, GetBlogListRequest>(
  'blog/getBlogList',
  async (getBlogListRequest) => {
    const bapi = new BlogAPI();
    const result = await bapi.getBlogList(getBlogListRequest.page, getBlogListRequest.pagination);

    const morePages = isBoolean(result.morePages)
      ? result.morePages
      : false;

    return {
      posts: result.posts.toJSON(),
      morePages,
    };
  },
);

const getFullBlogList = createAsyncThunk<GetBlogListOutput, GetBlogListRequest>(
  'blog/getBlogList',
  async (getBlogListRequest) => {
    const bapi = new BlogAPI();
    const result = await bapi.getFullBlogList(getBlogListRequest.page, getBlogListRequest.pagination);

    const morePages = isBoolean(result.morePages)
      ? result.morePages
      : false;

    return {
      posts: result.posts.toJSON(),
      morePages,
    };
  },
);

interface AddBlogPostBody {
  newPost: NewBlogPost,
}

const addBlogPost = createAsyncThunk<BlogPostInterface, AddBlogPostBody>(
  'blog/addBlogPost',
  async(newBlogPost) => {
    const bapi = new BlogAPI();
    const post = await bapi.addBlogPost(
      newBlogPost.newPost,
    );

    // console.log('new blog post', post);

    return post.toJSON();
  },
);

interface UpdateBlogPostBody {
  post: BlogPost;
  oldSlug: string;
}

const updateBlogPost = createAsyncThunk<BlogPostInterface, UpdateBlogPostBody>(
  'blog/updateBlogPost',
  async(updatedBlogPost) => {
    const bapi = new BlogAPI();
    const post = await bapi.updateBlogPost(updatedBlogPost.oldSlug, updatedBlogPost.post);

    return post.toJSON();
  },
);

const deleteBlogPost = createAsyncThunk<void, string>(
  'blog/deleteBlogPost',
  async(slug: string, { rejectWithValue }) => {
    const bapi = new BlogAPI();
    try {
      await bapi.deleteBlogPost(slug);
    } catch (e) {
      rejectWithValue(e);
      throw e;
    }
  },
);

const blogActions = {
  getBlogPost,
  getBlogList,
  getFullBlogList,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost,
};

export {
  blogSlice,
  blogActions,
};
