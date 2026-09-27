import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Pages in src/content/docs are generated from ../review by scripts/sync-content.mjs.
export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
