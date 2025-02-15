import { z } from 'zod';

// Schema for image metadata
const imageMetadataSchema = z.object({
  size: z.number(),
  width: z.number(),
  height: z.number(),
});

// Schema for image variants (original, small, thumbnail)
const imageVariantSchema = z.object({
  src: z.string(),
  metadata: imageMetadataSchema,
});

// Schema for an image object
const imageSchema = z.object({
  alt: z.string(),
  original: imageVariantSchema,
  small: imageVariantSchema,
  thumbnail: imageVariantSchema,
});

// Schema for a game tile
const gameTileSchema = z.object({
  type: z.literal('game-tile'),
  id: z.string(),
  platformId: z.string(),
  slug: z.string(),
  image: imageSchema,
  gameText: z.string(),
  provider: z.string(),
  provider_slug: z.string(),
  betSize: z.object({
    min: z.number(),
  }),
  liveRtp: z.number().nullable(),
});

// Schema for a menu item
const menuItemSchema = z.object({
  id: z.string(),
  image: z.object({
    alt: z.string(),
  }),
  activeImage: z.null(),
  name: z.string(),
  path: z.string(),
  isLiveCasino: z.boolean(),
  links: z.object({
    getPageMetadata: z.string(),
    getPage: z.string(),
  }),
  animatedSvg: z.object({
    mobile: z.object({
      alt: z.string(),
      original: imageVariantSchema,
    }),
    desktop: z.object({
      alt: z.string(),
      original: imageVariantSchema,
    }),
  }),
  type: z.string(),
  categoryFilter: z.string().nullable(),
});

// Schema for the lobby menu
const lobbyMenuSchema = z.object({
  items: z.array(menuItemSchema),
});

// Schema for the live lobby menu
const liveLobbyMenuSchema = z.object({
  items: z.array(menuItemSchema),
});

// Schema for a game filter item
const gameFilterItemSchema = z.object({
  id: z.string(),
  text: z.string(),
  filter: z.object({
    providerId: z.string().optional(),
    collectionSlug: z.string().optional(),
  }),
});

// Schema for a game filter
const gameFilterSchema = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string(),
  items: z.array(gameFilterItemSchema),
});

// Schema for metadata
const metadataSchema = z.object({
  updatedAt: z.string().datetime(),
});

// Schema for footer content
const footerContentSchema = z.object({
  logoUrl: z.string(),
  links: z.array(
    z.object({
      text: z.string(),
      path: z.string(),
    }),
  ),
  licenseLogos: z.array(
    z.object({
      title: z.string(),
      imageUrl: z.string(),
      link: z.string(),
    }),
  ),
  copyright: z.string(),
  licenseText: z.string(),
  responsibleGambling: z.string(),
  providerLogos: z.array(
    z.object({
      name: z.string(),
      path: z.string(),
      imageUrl: z.string(),
    }),
  ),
});

// Schema for the config object
export const configSchema = z.object({
  gamesOfTheMonth: z.array(gameTileSchema),
  menu: z.object({
    lobby: lobbyMenuSchema,
    liveLobby: liveLobbyMenuSchema,
  }),
  gameFilterConfig: z.array(gameFilterSchema),
  liveGameFilterConfig: z.array(gameFilterSchema),
  metadata: metadataSchema,
  sidebarLinks: z.array(z.unknown()), // Adjust as needed
  footerContent: footerContentSchema,
  paymentMethods: z.array(z.unknown()), // Adjust as needed
  featureToggles: z.null(),
});

export type Config = z.infer<typeof configSchema>;
