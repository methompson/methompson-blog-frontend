import { FileDetails, FileDetailsJSON } from '@/src/models/file_models';

import { getAuthToken } from '@/src/shared/auth_functions';
import { getBaseApiUrl } from '@/src/shared/get_base_url';
import { isBoolean, isNumber, isRecord } from '@/src/shared/type_guards';
import { basicHttpErrorHandling } from '@/src/shared/http_error_handling';

export interface FileListResponse {
  files: FileDetailsJSON[];
  totalFiles: number;
  page: number;
  pagination: number;
}

export interface ImageFileUploadRequest {
  files: FileList;
  isPrivate: boolean;
}

export interface FileUploadRequest {
  files: FileList;
  isPrivate: boolean;
}

export class FileAPI {
  async getFileList(_page = 1, _pagination = 20): Promise<FileListResponse> {
    const baseUrl = getBaseApiUrl();
    const queryParams = `page=${_page}&pagination=${_pagination}`;

    const url = `${baseUrl}/list?${queryParams}`;

    const token = await getAuthToken();
    const headers = {
      authorization: token,
    };

    const resp = await fetch(url, { headers });

    if (!resp.ok) {
      basicHttpErrorHandling(resp);
    }

    const json = await resp.json();

    if (!isRecord(json)) {
      throw new Error('Invalid response from server');
    }

    const { page, pagination, files, totalFiles } = json;

    const filesTest = Array.isArray(files);
    const totalFilesTest = isNumber(totalFiles);
    const pageTest = isNumber(page);
    const paginationTest = isNumber(pagination);

    if (!filesTest || !totalFilesTest || !pageTest || !paginationTest) {
      throw new Error('Invalid response from server');
    }

    const filesOutput = files.map((file) => FileDetails.fromJSON(file).toJSON());

    return {
      files: filesOutput,
      totalFiles,
      page,
      pagination,
    };
  }

  async uploadFiles(req: FileUploadRequest) {
    const baseUrl = getBaseApiUrl();
    const url = `${baseUrl}/upload`;

    const token = await getAuthToken();
    const headers = {
      authorization: token,
    };

    const body = new FormData();

    for (const file of req.files) {
      body.append('file', file);
    }

    body.append('ops', JSON.stringify({
      isPrivate: req.isPrivate,
    }));

    const resp = await fetch(url, { method: 'POST', headers, body });

    const json = await resp.json();

    console.log(json);

    if (!Array.isArray(json)) {
      throw new Error('Invalid response from server');
    }

    const output = json.map((el) => FileDetails.fromJSON(el));

    return output;
  }

  async uploadImages(req: ImageFileUploadRequest) {
    const baseUrl = getBaseApiUrl();
    const url = `${baseUrl}/file/image_upload`;

    const token = await getAuthToken();
    const headers = {
      authorization: token,
    };

    const body = new FormData();

    for (const file of req.files) {
      body.append('image', file);
    }

    body.append('ops', JSON.stringify([{
      isPrivate: req.isPrivate,
    }]));

    const resp = await fetch(url, { method: 'POST', headers, body });

    const json = await resp.json();

    console.log(json);

    if (!Array.isArray(json)) {
      throw new Error('Invalid response from server');
    }

    const output = json.map((el) => FileDetails.fromJSON(el));

    return output;
  }

  async deleteFiles() {
    throw new Error('Unimplemented');
  }
}