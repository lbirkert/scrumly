import type { PageServerLoad, Actions } from './$types';

import { form } from '$lib/server/form';
import { safeScrum } from '$lib/server/safe';
import { prisma } from '$lib/server/prisma';

import { error, redirect } from '@sveltejs/kit';
import { system, SystemAction } from '$lib/server/comment';

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
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		scrums: scrums.map((s) => safeScrum(s!))
	};
};

export const actions: Actions = {
	async move({ request, locals }) {
		const { project, member } = locals;

		const { id, to } = await form({ id: 'string', to: 'number' } as const, request);

		if (to > 3) {
			throw error(400, 'Invalid request');
		}

		const scrum = await prisma.scrum.findUnique({
			where: {
				id_projectId: {
					id: id,
					projectId: project.id
				}
			}
		});

		// log a message if a task was assigned
		if (scrum?.taskId != null) {
			const actions = {
				0: SystemAction.SCRUM_STORY,
				1: SystemAction.SCRUM_TODO,
				2: SystemAction.SCRUM_DOING,
				3: SystemAction.SCRUM_DONE
			} as { [key: number]: SystemAction };
			await system(project.id, scrum?.taskId, actions[to], member.id);
		}

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

		const { id, deep } = await form({ id: 'string', deep: 'bool' } as const, request);

		const { taskId } = await prisma.scrum.delete({
			where: {
				id_projectId: {
					projectId: project.id,
					id
				}
			}
		});

		if (deep) {
			if (taskId == null) {
				throw Error('taskId is null');
			}

			await prisma.task.delete({
				where: {
					id_projectId: {
						projectId: project.id,
						id: taskId
					}
				}
			});
		}

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
