import type { Actions } from './$types';

import { form } from '$lib/server/form';
import { prisma } from '$lib/server/prisma';
import { secret } from '$lib/server/secret';
import { redirect } from '@sveltejs/kit';
import { system, SystemAction } from '$lib/server/comment';

export const actions: Actions = {
	async text({ request, locals }) {
		const { project } = locals;

		const { content, column } = await form(
			{ content: 'string', column: 'number' } as const,
			request
		);

		// TODO: convert to data access layer
		const { id } = await prisma.scrum.create({
			data: {
				id: secret(5),
				project: {
					connect: {
						id: project.id
					}
				},
				column,
				content
			}
		});

		throw redirect(302, `/scrum#scrum-${id}`);
	},
	async task({ request, locals }) {
		const { project, member } = locals;

		const { content, column } = await form(
			{ content: 'string', column: 'number' } as const,
			request
		);

		const { id, taskId } = await prisma.scrum.create({
			data: {
				id: secret(5),
				project: {
					connect: {
						id: project.id
					}
				},
				task: {
					create: {
						id: secret(5),
						project: {
							connect: {
								id: project.id
							}
						},
						content,
						done: false
					}
				},
				column
			}
		});

		await system(project.id, taskId, SystemAction.TASK_CREATE, member.id);

		throw redirect(302, `/scrum#scrum-${id}`);
	},
	async import({ request, locals }) {
		const { project } = locals;

		const { id, column } = await form({ id: 'string', column: 'number' } as const, request);

		const scrum = await prisma.scrum.create({
			data: {
				id: secret(5),
				project: {
					connect: {
						id: project.id
					}
				},
				task: {
					connect: {
						id_projectId: {
							projectId: project.id,
							id
						}
					}
				},
				column
			}
		});

		throw redirect(302, `/scrum#scrum-${scrum.id}`);
	}
};
