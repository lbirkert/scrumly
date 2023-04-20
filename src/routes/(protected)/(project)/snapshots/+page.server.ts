import type { PageServerLoad, Actions } from './$types';

import { prisma } from '$lib/server/prisma';
import { form } from '$lib/server/form';

import { redirect } from '@sveltejs/kit';

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

		await prisma.snapshot.deleteMany({
			where: {
				projectId: project.id,
				id
			}
		});

		throw redirect(302, '/snapshots');
	}
};
