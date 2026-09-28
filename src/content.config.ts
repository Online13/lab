import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * One entry per experiment: a notion I want to test or learn, explored through code, then published.
 * Files starting with "_" are ignored (templates, drafts).
 * - kind "web": a live experiment; put its code in src/pages/experiments/<id>/ and set `demo`.
 * - kind "showcase": a non-web notion presented with Markdown only.
 */
const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/[^_]*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		kind: z.enum(['web', 'showcase']),
		status: z.enum(['todo', 'wip', 'done']).default('todo'),
		date: z.coerce.date(),
		tags: z.array(z.string()).default([]),
		demo: z.string().optional(),
		cover: z.string().optional(),
	}),
});

export const collections = { projects };
