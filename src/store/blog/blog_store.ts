import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { BlogAPI } from '@src/api/blog_api';
import { BlogPostInterface } from '@/src/models/blog_post';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {},
  reducers: {},
});

interface GetBlogPostRequest {
  slug: string;
}

interface GetBlogListRequest {
  page?: number;
  pagination?: number;
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

const getBlogList = createAsyncThunk(
  'blog/getBlogList',
  async (getBlogListRequest: GetBlogListRequest) => {
    const bapi = new BlogAPI();
    const collection = await bapi.getBlogList(getBlogListRequest.page, getBlogListRequest.pagination);

    return collection.toJSON();
  },
);

const addBlogPost = createAsyncThunk(
  'blog/addBlogPost',
  async() => {},
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
