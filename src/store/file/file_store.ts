import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  FileAPI,
  FileListResponse,
  FileUploadRequest,
  ImageFileUploadRequest,
} from '@/src/api/file_api';

export const fileSlice = createSlice({
  name: 'file',
  initialState: {},
  reducers: {},
});

interface GetFileListRequest {
  page?: number;
  pagination?: number;
}

const getFileList = createAsyncThunk<FileListResponse, GetFileListRequest>(
  'file/getFileList',
  async (getFileListRequest: GetFileListRequest): Promise<FileListResponse> => {
    const fapi = new FileAPI();

    return fapi.getFileList(
      getFileListRequest?.page,
      getFileListRequest?.pagination,
    );
  },
);

const uploadFiles = createAsyncThunk<unknown, FileUploadRequest>(
  'file/uploadFiles',
  async (uploadFilesRequest: FileUploadRequest): Promise<unknown> => {
    const fapi = new FileAPI();

    const result = await fapi.uploadFiles(uploadFilesRequest);
    return null;
  },
);

const deleteFiles = createAsyncThunk<unknown, string[]>(
  'file/deleteFiles',
  async (filesToDelete: string[]): Promise<unknown> => {
    const fapi = new FileAPI();

    const result = await fapi.deleteFiles(filesToDelete);
    return undefined;
  },
);

const uploadImages = createAsyncThunk<unknown, ImageFileUploadRequest>(
  'file/uploadImages',
  async (uploadFilesRequest: ImageFileUploadRequest): Promise<unknown> => {
    const fapi = new FileAPI();

    const result = await fapi.uploadImages(uploadFilesRequest);

    return null;
  },
);

export const fileActions = {
  getFileList,
  uploadFiles,
  uploadImages,
  deleteFiles,
};
