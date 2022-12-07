export function isRecord(value: unknown): value is Record<string, unknown> {
  const val = value as Record<string, unknown>;

  return !isNullOrUndefined(value) && typeof val === 'object' && !Array.isArray(val);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isUndefined(value: unknown): value is null {
  return value === undefined;
}

export function isNullOrUndefined(value: unknown): value is null | undefined {
  return isNull(value) || isUndefined(value);
}

export function isNumberOrNullOrUndefined(value: unknown): value is number | null | undefined {
  return isNullOrUndefined(value) || isNumber(value);
}

export function isStringOrNullOrUndefined(value: unknown): value is string | null | undefined {
  return isNullOrUndefined(value) || isString(value);
}

export function isStringArray(value: unknown): value is string[] {
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

