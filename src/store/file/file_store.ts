import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { FileAPI, FileUploadRequest, ImageFileUploadRequest } from '@/src/api/file_api';

export const fileSlice = createSlice({
  name: 'file',
  initialState: {},
  reducers: {},
});

interface GetFileListRequest {}

const getFileList = createAsyncThunk<unknown, GetFileListRequest>(
  'file/getFileList',
  async (getFileListRequest: GetFileListRequest): Promise<unknown> => {
    const fapi = new FileAPI();

    try {
      const result = await fapi.getFileList();
      console.log(result);
    } catch (e) {
      console.error('Error getting file list:', e);
    }
    return null;
  },
);

const uploadFiles = createAsyncThunk<unknown, FileUploadRequest>(
  'file/uploadFiles',
  async (uploadFilesRequest: FileUploadRequest): Promise<unknown> => {
    const fapi = new FileAPI();

    try {
      const result = await fapi.uploadFiles(uploadFilesRequest);
      console.log(result);
    } catch (e) {
      console.error('Error getting file list:', e);
    }
    return null;
  },
);

const uploadImages = createAsyncThunk<unknown, ImageFileUploadRequest>(
  'file/uploadImages',
  async (uploadFilesRequest: ImageFileUploadRequest): Promise<unknown> => {
    const fapi = new FileAPI();

    try {
      const result = await fapi.uploadImages(uploadFilesRequest);
      console.log(result);
    } catch (e) {
      console.error('Error uploading image:', e);
    }
    return null;
  },
);

export const fileActions = {
  getFileList,
  uploadFiles,
  uploadImages,
};