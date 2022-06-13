import { InvalidInputError } from './invalid_input_error';

/**
 * Represents an error caused by an HTTP 400 Status
 */
export class HttpBadRequestError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, HttpBadRequestError.prototype);
  }
}

/**
 * Represents an error caused by an HTTP 401 Status
 */
export class HttpUnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, HttpUnauthorizedError.prototype);
  }
}

/**
 * Represents an error caused by an HTTP 403 Status
 */
export class HttpForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, HttpForbiddenError.prototype);
  }
}

/**
 * Represents an error caused by an HTTP 404 Status
 */
export class HttpNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, HttpNotFoundError.prototype);
  }
}

/**
 * Represents an error caused by an HTTP 500 Status
 */
export class HttpInternalServerError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, HttpInternalServerError.prototype);
  }
}

/**
 * Represents an error caused by an HTTP 503 Status
 */
export class HttpServiceUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, HttpServiceUnavailableError.prototype);
  }
}

/**
 * Represents an error caused by an HTTP 504 Status
 */
export class HttpGatewayTimeoutError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, HttpGatewayTimeoutError.prototype);
  }
}

/**
 * Represents a generic error caused by an HTTP status 400 outside of what's already defined
 */
export class Http400Error extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, Http400Error.prototype);
  }
}

/**
 * Represents a generic error caused by an HTTP status 500 outside of what's already defined
 */
export class Http500Error extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, Http500Error.prototype);
  }
}

export function getErrorByStatus(status: number, error: string) {
  if (status < 400 || status >= 600) {
    throw new InvalidInputError('Status must be >= 400 and < 600');
  }

  switch (status) {
    case 400:
      return new HttpBadRequestError(error);
    case 401:
      return new HttpUnauthorizedError(error);
    case 403:
      return new HttpForbiddenError(error);
    case 404:
      return new HttpNotFoundError(error);
    case 500:
      return new HttpInternalServerError(error);
    case 503:
      return new HttpServiceUnavailableError(error);
    case 504:
      return new HttpGatewayTimeoutError(error);
  }

  if (status < 500) {
    return new Http400Error(error);
  }

  return new Http500Error(error);
}