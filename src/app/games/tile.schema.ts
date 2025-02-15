import { z } from 'zod';

// Schema for image metadata
const imageMetadataSchema = z.object({
  size: z.number(),
  width: z.number(),
  height: z.number(),
});

// Schema for image variants (320, 480, 768, etc.)
const imageVariantSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string(),
  metadata: z.object({}), // Empty object, as metadata is not defined in the example
});

// Schema for the image object
const imageSchema = z.object({
  '320': imageVariantSchema,
  '480': imageVariantSchema,
  '768': imageVariantSchema,
  '1024': imageVariantSchema,
  '1280': imageVariantSchema,
  '1600': imageVariantSchema,
  '1920': imageVariantSchema,
  '2560': imageVariantSchema,
  alt: z.string(),
  original: z.object({
    src: z.string(),
    metadata: z.object({}), // Empty object, as metadata is not defined in the example
  }),
  small: z.object({
    src: z.string(),
    metadata: z.object({}), // Empty object, as metadata is not defined in the example
  }),
  thumbnail: z.object({
    src: z.string(),
    metadata: z.object({}), // Empty object, as metadata is not defined in the example
  }),
});

// Schema for the provider logo
const providerLogoSchema = z.object({
  alt: z.string(),
  original: z.object({
    src: z.string(),
    metadata: imageMetadataSchema,
  }),
});

// Schema for a game tile
const gameTileSchema = z.object({
  type: z.literal('game-tile'),
  id: z.string(),
  platformId: z.string(),
  gameText: z.string(),
  provider: z.string(),
  provider_slug: z.string(),
  providerLogo: providerLogoSchema,
  image: imageSchema,
  slug: z.string(),
  betSize: z.object({
    min: z.number(),
  }),
  liveRtp: z.number().nullable(),
  isLiveGame: z.boolean(),
});

// Schema for the tile object
export const tilesSchema = z.object({
  items: z.array(gameTileSchema),
  count: z.string(),
});

export type Tile = z.infer<typeof tilesSchema>;
