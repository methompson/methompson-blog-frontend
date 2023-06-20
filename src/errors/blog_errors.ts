export class AddBlogError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AddBlogError.prototype);
  }
}

export class DataModificationError extends Error {
  constructor(message: string = 'Error Updating Data Online') {
    super(message);
    Object.setPrototypeOf(this, DataModificationError.prototype);
  }
}
