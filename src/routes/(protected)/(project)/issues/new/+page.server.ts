import type { Actions } from './$types';

import { prisma } from '$lib/server/prisma';
import { form } from '$lib/server/form';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const { member, project } = locals;

		// TODO: check member permissions

		const { title, content } = await form({ title: 'string', content: 'string' } as const, request);

		const { id } = await prisma.issue.create({
			data: {
				title,
				projectId: project.id,
				authorId: member.id
			}
		});

		await prisma.comment.create({
			data: {
				issueId: id,
				content: content,
				memberId: member.id
			}
		});

		throw redirect(301, `/issues/${id}`);
	}
};
