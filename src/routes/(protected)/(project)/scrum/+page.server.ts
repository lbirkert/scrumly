import type { PageServerLoad, Actions } from './$types';

import { form } from '$lib/server/form';
import { safeScrum } from '$lib/server/safe';
import { prisma } from '$lib/server/prisma';

import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const { project } = locals;

	const scrums = await prisma.scrum.findMany({
		where: {
			projectId: project.id
		},
		include: {
			task: {
				include: {
					assignees: {
						include: {
							member: true
						}
					}
				}
			}
		}
	});

	return {
		scrums: scrums.map(s => safeScrum<"", "comments", "project", "", "", "", "">(s!))
	};
};

export const actions: Actions = {
	async move({ request, locals }) {
		const { project } = locals;

		const { id, to } = await form({ id: 'string', to: 'number' } as const, request);

		const scrum = await prisma.scrum.findUnique({
			where: {
				id_projectId: {
					id: id,
					projectId: project.id
				}
			}
		});

		if (!scrum) throw error(404, 'Not found');

		// TODO: check member permissions

		await prisma.scrum.update({
			where: {
				id_projectId: {
					id: id,
					projectId: project.id
				}
			},
			data: { column: to }
		});
	},
	async delete({ request, locals }) {
		const { project } = locals;

		const { id } = await form({ id: 'string' } as const, request);

		await prisma.scrum.delete({
			where: {
				id_projectId: {
					projectId: project.id,
					id
				}
			}
		});

		throw redirect(302, '/scrum');
	},
	async edit({ request, locals }) {
		const { project } = locals;

		const { id, content } = await form({ id: 'string', content: 'string' } as const, request);

		const scrum = await prisma.scrum.findUnique({
			where: {
				id_projectId: {
					projectId: project.id,
					id
				}
			},
			include: { task: true }
		});

		if (!scrum) throw error(404, 'Not found');

		if (scrum.task) {
			await prisma.task.update({
				where: {
					id_projectId: {
						id: scrum.task.id,
						projectId: project.id
					}
				},
				data: { content }
			});
		} else {
			await prisma.scrum.update({
				where: {
					id_projectId: {
						projectId: project.id,
						id
					}
				},
				data: { content }
			});
		}

		throw redirect(302, `/scrum#scrum-${id}`);
	}
};
