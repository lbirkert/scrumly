import type { PageServerLoad, Actions } from './$types';

import { prisma } from '$lib/server/prisma';
import { safeMember } from '$lib/server/safe';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	const _member = await prisma.member.findUnique({
		where: {
			id_projectId: {
				id: params.id,
				projectId: locals.project.id
			}
		}
	});

	if (!_member) throw error(404, 'Not found');

	return {
		_member: safeMember(_member)
	};
};

export const actions: Actions = {
	async delete({ params, locals }) {
		if (locals.member.role !== 0) throw error(401, 'Lacking permission');
		if (params.id === locals.member.id) throw error(400, 'You cannot delete yourself');

		await prisma.member.delete({
			where: {
				id_projectId: {
					id: params.id,
					projectId: locals.project.id
				}
			}
		});

		throw redirect(302, '/members');
	}
};
