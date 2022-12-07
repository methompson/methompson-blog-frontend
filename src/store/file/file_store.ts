import { FileAPI, FileUploadRequest } from '@/src/api/file_api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

export const fileActions = {
  getFileList,
  uploadFiles,
};