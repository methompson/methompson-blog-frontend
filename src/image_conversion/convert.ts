import wasm_heif from '@saschazar/wasm-heif';
import { ImageOp } from '@/src/shared/image_op';

import init, {
  process_image,
  process_rgb_data,
} from '@/src/image_conversion/rust_image_conversion/rust_image_converter';
import { isNullOrUndefined } from '@/src/shared/type_guards';

export interface ConversionResult {
  file: File;
  identifier: string;
  isPrivate: boolean;
}

interface ConversionInput {
  new_format?: string;
  max_size?: number;
  image_quality?: number;
}

export async function processImage(
  file: File,
  imgOps: Record<string, ImageOp>,
  filename: string,
): Promise<ConversionResult[]> {
  await init();

  if (file.type === 'image/heic') {
    return convertHeif(file, imgOps, filename);
  }

  return convertImage(file, imgOps, filename);
}

async function convertImage(
  file: File,
  imgOps: Record<string, ImageOp>,
  filename: string,
): Promise<ConversionResult[]> {
  const buf = await file.arrayBuffer();
  const uint8Arr = new Uint8Array(buf);

  const results: ConversionResult[] = [];

  for (const op of Object.values(imgOps)) {
    const input: ConversionInput = {
      max_size: op.longestSideResolution,
      new_format: op.imageFormat,
      image_quality: 60,
    };

    const result = process_image(uint8Arr, input);

    console.log(uint8Arr.length);
    console.log(result.length);

    results.push(makeConversionResult(result, filename, op, file));
  }

  return results;
}

async function convertHeif(
  file: File,
  imgOps: Record<string, ImageOp>,
  filename: string,
): Promise<ConversionResult[]> {
  const heifModule = await wasm_heif();

  const buff = await file.arrayBuffer();
  const uint8Arr = new Uint8Array(buff);

  const decodedValue = heifModule.decode(uint8Arr, uint8Arr.length, false);
  const dimensions = heifModule.dimensions();

  if (!(decodedValue instanceof Uint8Array)) {
    heifModule.free();
    return [];
  }

  const results: ConversionResult[] = [];

  for (const op of Object.values(imgOps)) {
    if (isNullOrUndefined(op.imageFormat)) {
      op.imageFormat = 'jpeg';
    }

    const input: ConversionInput = {
      max_size: op.longestSideResolution,
      new_format: op.imageFormat,
      image_quality: 60,
    };
    const result = process_rgb_data(
      decodedValue,
      dimensions.width,
      dimensions.height,
      input,
    );

    console.log(decodedValue.length);
    console.log(result.length);

    results.push(makeConversionResult(result, filename, op, file));
  }

  heifModule.free();

  return results;
}

function makeConversionResult(
  result: Uint8Array,
  filename: string,
  op: ImageOp,
  file: File,
): ConversionResult {
  const name = getFilename(filename, op, file);
  console.log('name', name);

  const resultFile = new File([result], name, {
    type: getMimeType(op, file),
  });

  const conversionResult: ConversionResult = {
    file: resultFile,
    identifier: op.identifier,
    isPrivate: op.isPrivate,
  };

  return conversionResult;
}

function getMimeType(op: ImageOp, file: File): string {
  switch (op.imageFormat) {
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'bmp':
      return 'image/bmp';
    case 'gif':
      return 'image/gif';
    case 'tiff':
      return 'image/tiff';
    default:
      return file.type;
  }
}

function getFilename(filename: string, op: ImageOp, file: File): string {
  console.log(op.imageFormat);
  let ext = '';
  if (op.imageFormat === 'same' || op.imageFormat === undefined) {
    ext = extractExtension(file.name);
  } else {
    ext = getExtensionFromOp(op);
  }

  const name = extractName(filename);

  const identifier = op.identifier.length > 0 ? `_${op.identifier}` : '';

  return `${name}${identifier}.${ext}`;
}

// get extension from op
function getExtensionFromOp(op: ImageOp): string {
  switch (op.imageFormat) {
    case 'jpeg':
      return 'jpg';
    case undefined:
      return '';
    default:
      return op.imageFormat;
  }
}

function extractExtension(filename: string) {
  const parts = filename.split('.');
  if (parts.length <= 1) {
    return '';
  }
  return parts[parts.length - 1];
}

// Extracts a file extension from a file name
function extractName(filename: string) {
  const parts = filename.split('.');
  if (parts.length <= 1) {
    return parts.join('.');
  }
  const name = parts.slice(0, parts.length - 1);
  return name.join('.');
}
