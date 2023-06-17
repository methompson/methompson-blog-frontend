/**
 * levels:
 * 0 - bytes
 * 1 - kilobytes
 * 2 - megabytes
 * 3 - gigabytes
 * 4 - terabytes
 */

export enum FileSizeEnum {
  Bytes = 'bytes',
  Kilobytes = 'kilobytes',
  Megabytes = 'megabytes',
  Gigabytes = 'gigabytes',
  Terabytes = 'terabytes',
}

export interface FileSizeInterface {
  size: number;
  unit: FileSizeEnum;
}

function levelToFileSizeEnum(level: number) {
  switch (level) {
    case 4:
      return FileSizeEnum.Terabytes;
    case 3:
      return FileSizeEnum.Gigabytes;
    case 2:
      return FileSizeEnum.Megabytes;
    case 1:
      return FileSizeEnum.Kilobytes;
    case 0:
    default:
      return FileSizeEnum.Bytes;
  }
}

export function getFileSize(
  size: number,
  level: number = 0,
): FileSizeInterface {
  if (size < 1000 || level >= 4) {
    return {
      size,
      unit: levelToFileSizeEnum(level),
    };
  }

  return getFileSize(size / 1024, level + 1);
}

export function shortUnitName(fse: FileSizeEnum) {
  switch (fse) {
    case FileSizeEnum.Terabytes:
      return 'TB';
    case FileSizeEnum.Gigabytes:
      return 'GB';
    case FileSizeEnum.Megabytes:
      return 'MB';
    case FileSizeEnum.Kilobytes:
      return 'KB';
    case FileSizeEnum.Bytes:
    default:
      return 'bytes';
  }
}
