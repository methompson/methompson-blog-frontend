class NoResultError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NoResultError.prototype);
  }
}

export { NoResultError };
