import {
  isRecord,
  isNumberOrNullOrUndefined,
} from '@/src/shared/type_guards';

describe('Type Guards', () => {
  describe('isRecord', () => {
    test('Returns true for objects', () => {
      expect(isRecord({})).toBe(true);
      expect(isRecord(new Date())).toBe(true);
    });

    test('Returns false for non-objects', () => {
      expect(isRecord([])).not.toBe(true);
      expect(isRecord(null)).not.toBe(true);
      expect(isRecord(undefined)).not.toBe(true);
      expect(isRecord(true)).not.toBe(true);
      expect(isRecord(1)).not.toBe(true);
      expect(isRecord('')).not.toBe(true);
    });
  });

  describe('isNumberOrNullOrUndefined', () => {
    test('returns true for numbers, null or undefined', () => {
      expect(isNumberOrNullOrUndefined(1)).toBe(true);
      expect(isNumberOrNullOrUndefined(null)).toBe(true);
      expect(isNumberOrNullOrUndefined(undefined)).toBe(true);
    });

    test('returns false for everything else', () => {
      expect(isNumberOrNullOrUndefined('')).not.toBe(true);
      expect(isNumberOrNullOrUndefined({})).not.toBe(true);
      expect(isNumberOrNullOrUndefined([])).not.toBe(true);
      expect(isNumberOrNullOrUndefined(true)).not.toBe(true);
    });
  });
});