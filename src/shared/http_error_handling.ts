import {
  HttpBadRequestError,
  HttpInternalServerError,
  HttpNotFoundError,
  HttpUnauthorizedError,
} from '@/src/errors/http_error';

export function basicHttpErrorHandling(resp: Response) {
  if (resp.status === 400) {
    throw new HttpBadRequestError('');
  }

  if (resp.status === 401) {
    throw new HttpUnauthorizedError('');
  }

  if (resp.status === 404) {
    throw new HttpNotFoundError('');
  }

  if (resp.status >= 500) {
    throw new HttpInternalServerError('');
  }

  throw new Error('');
}
