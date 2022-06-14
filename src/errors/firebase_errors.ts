export class FirebasePersistenceError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, FirebasePersistenceError.prototype);
  }
}

export class FirebaseLoginError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, FirebaseLoginError.prototype);
  }
}