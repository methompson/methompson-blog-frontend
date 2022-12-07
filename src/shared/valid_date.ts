import { isDate } from '@/src/shared/type_guards';

export type ValidDate = Date;

function isValidDate(value: unknown): value is ValidDate {
  return isDate(value) && !Number.isNaN(value.getTime());
}

export { isValidDate };
