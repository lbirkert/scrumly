import { readAvatar } from '$lib/server/avatar';

import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, url }) => {
	const size = url.searchParams.get('s') || '128';

	let mime: string;
	let content: Buffer;
	try {
		[mime, content] = await readAvatar(params.id, size);
	} catch (e) {
		throw error(404, 'Not found');
	}

	return new Response(new Blob([content], { type: mime }));
};
