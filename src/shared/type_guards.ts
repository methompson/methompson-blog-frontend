function isRecord(value: unknown): value is Record<string, unknown> {
  const val = value as Record<string, unknown>;

  return !isNullOrUndefined(value) && typeof val === 'object' && !Array.isArray(val);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

function isNull(value: unknown): value is null {
  return value === null;
}

function isUndefined(value: unknown): value is null {
  return value === undefined;
}

function isNullOrUndefined(value: unknown): value is null | undefined {
  return isNull(value) || isUndefined(value);
}

function isNumberOrNullOrUndefined(value: unknown): value is number | null | undefined {
  return isNullOrUndefined(value) || isNumber(value);
}

function isStringOrNullOrUndefined(value: unknown): value is string | null | undefined {
  return isNullOrUndefined(value) || isString(value);
}

function isStringArray(value: unknown): value is string[] {
  if (Array.isArray(value)) {
    for (const t of value) {
      if (!isString(t)) {
        return false;
      }
    }
  } else {
    // If not an array, just return false
    return false;
  }

  return true;
}

export {
  isRecord,
  isString,
  isNumber,
  isBoolean,
  isDate,
  isStringArray,
  isNull,
  isUndefined,
  isNullOrUndefined,
  isNumberOrNullOrUndefined,
  isStringOrNullOrUndefined,
};
