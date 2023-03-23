import type { Actions } from './$types';

import { form } from '$lib/server/form';
import { prisma } from '$lib/server/prisma';
import { secret } from '$lib/server/secret';

export let actions: Actions = {
	default: async ({ request, locals }) => {
		const { member, project } = locals;

		const { usages, expires } = await form(
			{ usages: 'number', expires: '_date' } as const,
			request
		);

		const id = secret(32);

		// TODO: Check member permissions

		await prisma.invite.create({
			data: {
				creatorId: member!.id,
				projectId: project!.id,
				expires,
				usages,
				id
			}
		});

		return { id };
	}
};
