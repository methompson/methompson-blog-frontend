import { FileDetails, NewFileDetailsJSON } from '@/src/models/file_models';

import { getAuthToken } from '@/src/shared/auth_functions';
import { getApiUrlBase } from '@/src/shared/get_base_url';
import { basicHttpErrorHandling } from '@/src/shared/http_error_handling';
import { ImageOp } from '@/src/shared/image_op';
import { isNumber, isRecord, isString } from '@/src/shared/type_guards';
import { DataModificationError } from '@/src/errors/blog_errors';

export interface FileListResponse {
  files: NewFileDetailsJSON[];
  totalFiles: number;
  page: number;
  pagination: number;
}

export interface ImageFileUploadRequest {
  files: File[];
  ops: ImageOp[];
}

export interface FileOp {
  isPrivate: boolean;
}

export interface FileUploadRequest {
  files: File[];
  isPrivate?: boolean;
  fileOps?: Record<string, FileOp>;
}

export interface UpdateFileRequest {
  id: string;
  filename?: string;
  isPrivate?: boolean;
}

export class FileAPI {
  async getFileList(
    pageArg = 1,
    paginationArg = 20,
  ): Promise<FileListResponse> {
    const baseUrl = getApiUrlBase();
    const queryParams = `page=${pageArg}&pagination=${paginationArg}`;

    const url = `${baseUrl}/api/file/list?${queryParams}`;

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

    const filesOutput = files.map((file) =>
      FileDetails.fromJSON(file).toJSON(),
    );

    return {
      files: filesOutput,
      totalFiles,
      page,
      pagination,
    };
  }

  async uploadFiles(req: FileUploadRequest) {
    const baseUrl = getApiUrlBase();
    const url = `${baseUrl}/api/file/upload`;

    const token = await getAuthToken();
    const headers = {
      authorization: token,
    };

    const body = new FormData();

    for (const file of req.files) {
      body.append('file', file);
    }

    body.append(
      'ops',
      JSON.stringify({
        fileOps: req.fileOps ?? {},
        isPrivate: req.isPrivate ?? true,
      }),
    );

    const resp = await fetch(url, { method: 'POST', headers, body });

    const json = await resp.json();

    if (!Array.isArray(json)) {
      throw new Error('Invalid response from server');
    }

    const output = json.map((el) => FileDetails.fromJSON(el));

    return output;
  }

  async uploadImages(req: ImageFileUploadRequest) {
    const baseUrl = getApiUrlBase();
    const url = `${baseUrl}/api/file/image_upload`;

    const token = await getAuthToken();
    const headers = {
      authorization: token,
    };

    const body = new FormData();

    for (const file of req.files) {
      body.append('image', file);
    }

    body.append('ops', JSON.stringify(req.ops));

    const resp = await fetch(url, { method: 'POST', headers, body });

    const json = await resp.json();

    if (!Array.isArray(json)) {
      throw new Error('Invalid response from server');
    }

    const output = json.map((el) => FileDetails.fromJSON(el));

    return output;
  }

  async updateFile(req: UpdateFileRequest): Promise<void> {
    const baseUrl = getApiUrlBase();
    const url = `${baseUrl}/api/file/update`;

    const token = await getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      authorization: token,
    };

    const body = JSON.stringify(req);

    const resp = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    const json = await resp.json();

    if (!isRecord(json)) {
      throw new Error('Invalid response from server');
    }
  }

  async deleteFiles(filesToDelete: string[]) {
    const baseUrl = getApiUrlBase();
    const url = `${baseUrl}/api/file/delete`;

    const token = await getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      authorization: token,
    };

    const body = JSON.stringify(filesToDelete);

    const resp = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    const json = await resp.json();

    if (!resp.ok) {
      const errMsg = json.message;
      const msg: string = isString(errMsg) ? errMsg : 'Unknown Error';

      throw new DataModificationError(msg);
    }

    return filesToDelete;
  }
}
