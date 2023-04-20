import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { SNAPSHOTS_DIR } from '$env/static/private';

import { readFile } from 'fs/promises';
import { join } from 'path';

export const GET: RequestHandler = async ({ params }) => {
	let content: Buffer;
	try {
		content = await readFile(join(SNAPSHOTS_DIR, params.id));
	} catch (e) {
		throw error(404, 'Not found');
	}

	return new Response(new Blob([content], { type: 'application/json' }));
};
