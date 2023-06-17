import { FileSizeEnum, getFileSize } from './file_size';

describe('getFileSize', () => {
  test('returns bytes for less than 1000 bytes', () => {
    expect(getFileSize(999)).toStrictEqual({
      type: FileSizeEnum.Bytes,
      size: 999,
    });
  });

  test('returns kilobytes for 1000 bytes', () => {
    const bytes = 1000;
    const kb = bytes / 1024;
    const result = getFileSize(bytes);

    expect(result.unit).toBe(FileSizeEnum.Kilobytes);
    expect(result.size).toBe(kb);
  });

  test('returns kilobytes for 999 kilobytes', () => {
    const bytes = 1024 * 999;
    const result = getFileSize(bytes);

    expect(result.unit).toBe(FileSizeEnum.Kilobytes);
    expect(result.size).toBe(999);
  });

  test('returns megabytes for 1000 kilobytes', () => {
    const bytes = 1024 * 1000;
    const result = getFileSize(bytes);

    expect(result.unit).toBe(FileSizeEnum.Megabytes);
    expect(result.size).toBe(bytes / 1024 / 1024);
  });

  test('returns megabytes for 1 megabyte', () => {
    const bytes = 1024 * 1024;
    const result = getFileSize(bytes);

    expect(result.unit).toBe(FileSizeEnum.Megabytes);
    expect(result.size).toBe(1);
  });

  test('returns megabytes for 999 megabytes', () => {
    const bytes = 1024 * 1024 * 999;
    const result = getFileSize(bytes);

    expect(result.unit).toBe(FileSizeEnum.Megabytes);
    expect(result.size).toBe(999);
  });

  test('returns gigabytes for 1000 megabytes', () => {
    const bytes = 1024 * 1024 * 1000;
    const result = getFileSize(bytes);
    const gb = bytes / 1024 / 1024 / 1024;

    expect(result.unit).toBe(FileSizeEnum.Gigabytes);
    expect(result.size).toBe(gb);
  });

  test('returns gigabytes for 1 Gigabyte', () => {
    const bytes = 1024 * 1024 * 1024;
    const result = getFileSize(bytes);
    const gb = bytes / 1024 / 1024 / 1024;

    expect(result.unit).toBe(FileSizeEnum.Gigabytes);
    expect(result.size).toBe(gb);
  });

  test('returns gigabytes for 999 Gigabytes', () => {
    const bytes = 1024 * 1024 * 1024 * 999;
    const result = getFileSize(bytes);
    const gb = bytes / 1024 / 1024 / 1024;

    expect(result.unit).toBe(FileSizeEnum.Gigabytes);
    expect(result.size).toBe(gb);
  });

  test('returns terabytes for 1000 gigabytes', () => {
    const bytes = 1024 * 1024 * 1024 * 1000;
    const result = getFileSize(bytes);
    const tb = bytes / 1024 / 1024 / 1024 / 1024;

    expect(result.unit).toBe(FileSizeEnum.Terabytes);
    expect(result.size).toBe(tb);
  });

  test('returns terabytes for 1 terabyte', () => {
    const bytes = 1024 * 1024 * 1024 * 1024;
    const result = getFileSize(bytes);
    const tb = bytes / 1024 / 1024 / 1024 / 1024;

    expect(result.unit).toBe(FileSizeEnum.Terabytes);
    expect(result.size).toBe(tb);
  });

  test('returns terabytes for 999 terabyte', () => {
    const bytes = 1024 * 1024 * 1024 * 1024 * 999;
    const result = getFileSize(bytes);
    const tb = bytes / 1024 / 1024 / 1024 / 1024;

    expect(result.unit).toBe(FileSizeEnum.Terabytes);
    expect(result.size).toBe(tb);
  });

  test('returns terabytes for 1000 terabytes', () => {
    const bytes = 1024 * 1024 * 1024 * 1024 * 1000;
    const result = getFileSize(bytes);
    const tb = bytes / 1024 / 1024 / 1024 / 1024;

    expect(result.unit).toBe(FileSizeEnum.Terabytes);
    expect(result.size).toBe(tb);
  });

  test('returns terabytes for 1 petabyte', () => {
    const bytes = 1024 * 1024 * 1024 * 1024 * 1024;
    const result = getFileSize(bytes);
    const tb = bytes / 1024 / 1024 / 1024 / 1024;

    expect(result.unit).toBe(FileSizeEnum.Terabytes);
    expect(result.size).toBe(tb);
  });
});
