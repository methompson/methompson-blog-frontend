export class AddBlogError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AddBlogError.prototype);
  }
}