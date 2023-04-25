import type { Actions } from './$types';

import { prisma } from '$lib/server/prisma';
import { form } from '$lib/server/form';
import { secret } from '$lib/server/secret';
import { redirect } from '@sveltejs/kit';

import { system, SystemAction } from '$lib/server/comment';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const { project, member } = locals;

		// TODO: check member permissions

		const { content } = await form({ content: 'string' } as const, request);

		const { id } = await prisma.task.create({
			data: {
				id: secret(5),
				content,
				projectId: project.id,
				done: false
			}
		});

		await system(project.id, id, SystemAction.TASK_CREATE, member.id);

		throw redirect(301, `/tasks/${id}`);
	}
};
