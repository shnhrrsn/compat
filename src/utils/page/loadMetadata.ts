import { promises as fs } from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import { URL } from 'url';
import { docs } from '../paths';
import { PageMetadata, MdnCompat } from '../getPage';

export async function loadMetadata(mdn?: string | null): Promise<PageMetadata | null> {
	if (!mdn) {
		return null;
	}

	const mdnURL = new URL(mdn);
	if (mdnURL.host !== 'developer.mozilla.org' || !mdnURL.pathname.startsWith('/docs/')) {
		throw new Error();
	}

	try {
		const md = (
			await fs.readFile(
				path.join(docs, mdnURL.pathname.toLowerCase().substring(5), 'index.md')
			)
		).toString();
		const matterResult = matter(md);

		return {
			title: matterResult.data.title as string,
			html: (
				await remark()
					.use(html)
					.process(
						matterResult.content
							.replace(/^(\s*\{\{.+?\}\}\s*)+/g, '')
							.trim()
							.split(/\n\n/)[0]
					)
			).toString(),
		};
	} catch (error: any) {
		if (error.code === 'ENOENT') {
			return null;
		}

		throw error;
	}
}

export function generateMetadataFallback(
	page: string[],
	compat: Exclude<MdnCompat['__compat'], undefined>): PageMetadata {
	return {
		title: page.slice(page.length - 2).join(' '),
		html: compat.description ?? null,
	};
}
