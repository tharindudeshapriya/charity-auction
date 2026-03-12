import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

/**
 * Exports placeholder image data from the local JSON file.
 * Includes a safety fallback to an empty array to prevent 'undefined' errors during module evaluation.
 */
export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages || [];
