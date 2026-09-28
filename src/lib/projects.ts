import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Kind = Project['data']['kind'];

export const kinds: Record<Kind, { label: string; plural: string; blurb: string }> = {
	web: {
		label: 'Expérience web',
		plural: 'Expériences web',
		blurb: 'Des notions testées par le code, en direct dans le navigateur.',
	},
	showcase: {
		label: 'Présentation',
		plural: 'Présentations',
		blurb: 'Des notions apprises hors web, expliquées et illustrées.',
	},
};

export const statuses: Record<Project['data']['status'], string> = {
	todo: 'À explorer',
	wip: 'En cours',
	done: 'Terminé',
};

/** All projects, newest first, optionally filtered by kind. */
export async function getProjects(kind?: Kind): Promise<Project[]> {
	const all = await getCollection('projects', (p) => !kind || p.data.kind === kind);
	return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
