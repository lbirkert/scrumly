import type { PageServerLoad, Actions } from './$types';

import { prisma } from '$lib/server/prisma';
import { form } from '$lib/server/form';

import { SNAPSHOTS_DIR } from '$env/static/private';

import { redirect } from '@sveltejs/kit';

import { unlink } from 'fs/promises';
import { join } from 'path';

export const load: PageServerLoad = async ({ locals }) => {
	const { project } = locals;

	const snapshots = await prisma.snapshot.findMany({
		where: { projectId: project.id }
	});

	return {
		snapshots
	};
};

export const actions: Actions = {
	async delete({ locals, request }) {
		const { project } = locals;

		const { id } = await form({ id: 'string' } as const, request);

		const { count } = await prisma.snapshot.deleteMany({
			where: {
				projectId: project.id,
				id
			}
		});

		if (count) await unlink(join(SNAPSHOTS_DIR, id));

		throw redirect(302, '/snapshots');
	}
};
