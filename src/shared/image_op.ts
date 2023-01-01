export interface ImageOp {
  identifier: string;
  retainImage: boolean;
  imageFormat?: string;
  longestSideResolution?: number;
  stripMetadata?: boolean;
  isPrivate: boolean;
};