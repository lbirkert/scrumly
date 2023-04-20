import type { Actions } from './$types';

import { form } from '$lib/server/form';
import { prisma } from '$lib/server/prisma';
import { secret } from '$lib/server/secret';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	async text({ request, locals }) {
		const { project } = locals;

		const { content, column } = await form(
			{ content: 'string', column: 'number' } as const,
			request
		);

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
		const { project } = locals;

		const { content, column } = await form(
			{ content: 'string', column: 'number' } as const,
			request
		);

		const { id } = await prisma.scrum.create({
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

		throw redirect(302, `/scrum#scrum-${id}`);
	}
};
