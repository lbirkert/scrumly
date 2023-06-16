import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

import { undump, type Dumped } from '$lib/dumped';

export const ssr = false;

export const load: PageLoad = async ({ url, fetch }) => {
	const param = url.searchParams.entries().next().value[0];

	let snapshotId: string;
	let collection: [string, number, string[]] | undefined = undefined;
	if (/.*![0-9]+/.test(param)) {
		const [collectionId, indexStr] = param.split('!');
		const index = parseInt(indexStr);

		const snapshots = (await (await fetch(`/snapshots/${collectionId}`)).text())
			.split('\n')
			.filter((x) => x);

		snapshotId = snapshots[index];

		collection = [collectionId, index, snapshots];
	} else {
		snapshotId = param;
	}

	const response = await fetch(`/snapshots/${snapshotId}`);

	if (response.status === 200) {
		return { collection, snapshot: undump((await response.json()) as Dumped) };
	} else throw error(404, 'Not found');
};
