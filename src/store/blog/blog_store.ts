import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';

import { BlogAPI } from '@src/api/blog_api';
import { BlogPostInterface, NewBlogPost } from '@/src/models/blog_post';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {},
  reducers: {},
});

interface GetBlogPostRequest {
  slug: string;
}

const getBlogPost = createAsyncThunk(
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

const getBlogList = createAsyncThunk(
  'blog/getBlogList',
  async (getBlogListRequest: GetBlogListRequest) => {
    const bapi = new BlogAPI();
    const collection = await bapi.getBlogList(getBlogListRequest.page, getBlogListRequest.pagination);

    return collection.toJSON();
  },
);

interface AddBlogPostBody {
  newPost: NewBlogPost,
}

const addBlogPost = createAsyncThunk(
  'blog/addBlogPost',
  async(newBlogPost: AddBlogPostBody) => {
    const bapi = new BlogAPI();
    const post = await bapi.addBlogPost(
      newBlogPost.newPost,
    );

    console.log('new blog post', post);

    return post.toJSON();
  },
);

const blogActions = {
  getBlogPost,
  getBlogList,
  addBlogPost,
};

export {
  blogSlice,
  blogActions,
};
