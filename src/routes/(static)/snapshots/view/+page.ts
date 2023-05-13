import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

import { undump, type Dumped } from '$lib/dumped';

export const ssr = false;

export const load: PageLoad = async ({ url, fetch }) => {
	const snapshotId = url.searchParams.entries().next().value[0];

	const response = await fetch(`/snapshots/${snapshotId}`);

	if (response.status === 200) {
		return undump((await response.json()) as Dumped);
	} else throw error(404, 'Not found');
};
