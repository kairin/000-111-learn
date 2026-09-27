// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { BASE, REPO_URL, SITE } from './site.config.mjs';

// Content under src/content/docs, src/data and public/sources is GENERATED from ../review
// by scripts/sync-content.mjs (runs automatically before `dev` and `build`).
export default defineConfig({
	site: SITE,
	base: BASE,
	outDir: '../serve',
	integrations: [
		starlight({
			title: 'Assembly vs. Fortran — Review Tracker',
			description:
				'Adversarial review of Gemini-generated guides to learning Assembly and Fortran, and the plan to learn both.',
			social: [{ icon: 'github', label: 'GitHub', href: REPO_URL }],
			editLink: { baseUrl: `${REPO_URL}/edit/main/` },
			lastUpdated: false,
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Overview',
					items: [
						{ label: 'Dashboard', link: '/' },
						{ label: 'Findings explorer', link: '/findings/' },
						{ slug: 'process' },
					],
				},
				{ label: 'Plan', items: [{ autogenerate: { directory: 'plan' } }] },
				{ label: 'Reviews (pass 1)', items: [{ autogenerate: { directory: 'reviews' } }] },
				{ label: 'Source documents', items: [{ autogenerate: { directory: 'sources' } }] },
				{
					label: 'Segments',
					items: [
						{ label: 'Segment index', slug: 'segments' },
						{ label: 'Segment map', slug: 'segments/segment-map' },
						{ label: '01 Career report', collapsed: true, items: [{ autogenerate: { directory: 'segments/assembly-fortran-comparison' } }] },
						{ label: '02 Retro game report', collapsed: true, items: [{ autogenerate: { directory: 'segments/assembly-versus-fortran-comparison' } }] },
						{ label: '03 Career advisor page', collapsed: true, items: [{ autogenerate: { directory: 'segments/assembly-vs-fortran-learning-advisor' } }] },
						{ label: '04 Retro advisor page', collapsed: true, items: [{ autogenerate: { directory: 'segments/retro-game-dev-language-advisor' } }] },
					],
				},
			],
		}),
	],
});
