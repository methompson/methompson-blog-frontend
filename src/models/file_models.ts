import {
  isBoolean,
  isNumber,
  isRecord,
  isString,
} from '@/src/shared/type_guards';
import { InvalidInputError } from '@/src/errors/invalid_input_error';

export interface NewFileDetailsJSON {
  originalFilename: string;
  filename: string;
  dateAdded: string;
  authorId: string;
  mimetype: string;
  size: number;
  isPrivate: boolean;
}

export class NewFileDetails {
  constructor(
    protected _originalFilename: string,
    protected _filename: string,
    protected _dateAdded: Date,
    protected _authorId: string,
    protected _mimetype: string,
    protected _size: number,
    protected _isPrivate: boolean,
  ) {}

  get originalFilename(): string {
    return this._originalFilename;
  }
  get filename(): string {
    return this._filename;
  }
  get dateAdded(): Date {
    return this._dateAdded;
  }
  get authorId(): string {
    return this._authorId;
  }
  get mimetype(): string {
    return this._mimetype;
  }
  get size(): number {
    return this._size;
  }
  get isPrivate(): boolean {
    return this._isPrivate;
  }

  toJSON(): NewFileDetailsJSON {
    return {
      originalFilename: this.originalFilename,
      filename: this.filename,
      dateAdded: this.dateAdded.toISOString(),
      authorId: this.authorId,
      mimetype: this.mimetype,
      size: this.size,
      isPrivate: this.isPrivate,
    };
  }

  static fromJSON(input: unknown): NewFileDetails {
    if (!NewFileDetails.isNewFileDetailsJSON(input)) {
      throw new InvalidInputError('Invalid File Details');
    }

    const dateAdded = new Date(input.dateAdded);

    return new NewFileDetails(
      input.originalFilename,
      input.filename,
      dateAdded,
      input.authorId,
      input.mimetype,
      input.size,
      input.isPrivate,
    );
  }

  static isNewFileDetailsJSON(input: unknown): input is NewFileDetailsJSON {
    if (!isRecord(input)) {
      return false;
    }

    const originalFilenameTest = isString(input.originalFilename);
    const filenameTest = isString(input.filename);
    const dateAddedTest = isString(input.dateAdded);
    const authorIdTest = isString(input.authorId);
    const mimetypeTest = isString(input.mimetype);
    const sizeTest = isNumber(input.size);
    const isPrivateTest = isBoolean(input.isPrivate);

    return (
      originalFilenameTest &&
      filenameTest &&
      dateAddedTest &&
      authorIdTest &&
      mimetypeTest &&
      sizeTest &&
      isPrivateTest
    );
  }
}

export interface FileDetailsJSON extends NewFileDetailsJSON {
  id: string;
}

export class FileDetails extends NewFileDetails {
  constructor(
    protected _id: string,
    originalFilename: string,
    filename: string,
    dateAdded: Date,
    authorId: string,
    mimetype: string,
    size: number,
    isPrivate: boolean,
  ) {
    super(
      originalFilename,
      filename,
      dateAdded,
      authorId,
      mimetype,
      size,
      isPrivate,
    );
  }

  get id(): string {
    return this._id;
  }

  toJSON(): FileDetailsJSON {
    return {
      ...super.toJSON(),
      id: this.id,
    };
  }

  static fromNewFileDetails(
    id: string,
    fileDetails: NewFileDetails,
  ): FileDetails {
    return new FileDetails(
      id,
      fileDetails.originalFilename,
      fileDetails.filename,
      fileDetails.dateAdded,
      fileDetails.authorId,
      fileDetails.mimetype,
      fileDetails.size,
      fileDetails.isPrivate,
    );
  }

  static fromJSON(input: unknown): FileDetails {
    if (!FileDetails.isFileDetailsJSON(input)) {
      throw new InvalidInputError('Invalid File Details Input');
    }

    const dateAdded = new Date(input.dateAdded);

    return new FileDetails(
      input.id,
      input.originalFilename,
      input.filename,
      dateAdded,
      input.authorId,
      input.mimetype,
      input.size,
      input.isPrivate,
    );
  }

  static isFileDetailsJSON(input: unknown): input is FileDetailsJSON {
    if (!isRecord(input)) {
      return false;
    }

    const idTest = isString(input.id);
    const originalFilenameTest = isString(input.originalFilename);
    const filenameTest = isString(input.filename);
    const dateAddedTest = isString(input.dateAdded);
    const authorIdTest = isString(input.authorId);
    const mimetypeTest = isString(input.mimetype);
    const sizeTest = isNumber(input.size);
    const isPrivateTest = isBoolean(input.isPrivate);

    return (
      idTest &&
      originalFilenameTest &&
      filenameTest &&
      dateAddedTest &&
      authorIdTest &&
      mimetypeTest &&
      sizeTest &&
      isPrivateTest
    );
  }
}
