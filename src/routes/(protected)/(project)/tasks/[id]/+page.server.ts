import type { Actions, PageServerLoad } from './$types';

import { error, redirect } from '@sveltejs/kit';

import type { Project, Prisma } from '@prisma/client';

import { prisma } from '$lib/server/prisma';
import { form } from '$lib/server/form';
import { secret } from '$lib/server/secret';
import { safeTask } from '$lib/server/safe';
import { system, SystemAction } from '$lib/server/comment';

// TODO: find out how to type these
async function findTask<T extends Prisma.TaskInclude | undefined>(
	params: { id: string },
	project: Project,
	include: T
) {
	const task = await prisma.task.findUnique({
		where: {
			id_projectId: {
				id: params.id,
				projectId: project.id
			}
		},
		include
	});
	if (!task) {
		throw error(404, 'Not found');
	}

	return task;
}

export const load: PageServerLoad = async ({ locals, params }) => {
	const { project } = locals;

	return {
		task: safeTask<'', 'project', '', '', 'project', ''>(
			await findTask(params, project, {
				comments: {
					include: {
						author: true
					}
				},
				assignees: {
					include: {
						member: true
					}
				}
			} as const)
		)
	};
};

export const actions: Actions = {
	async comment({ locals, params, request }) {
		const { project, member } = locals;

		const task = await findTask(params, project, undefined);

		// TODO: Check member permissions

		const { content } = await form({ content: 'string' } as const, request);

		const { id } = await prisma.comment.create({
			data: {
				id: secret(5),
				authorId: member.id,
				taskId: task.id,
				projectId: project.id,
				system: false,
				content
			}
		});

		throw redirect(302, `/tasks/${params.id}#comment-${id}`);
	},
	async done({ locals, params, request }) {
		const { project, member } = locals;

		const { done } = await form({ done: 'number' } as const, request);

		const task = await findTask(params, project, undefined);

		await prisma.task.update({
			data: { done: !!done },
			where: {
				id_projectId: {
					id: task.id,
					projectId: project.id
				}
			}
		});

		await system(
			project.id,
			task.id,
			done ? SystemAction.TASK_CLOSE : SystemAction.TASK_REOPEN,
			member.id
		);

		throw redirect(302, `/tasks/${params.id}`);
	},
	async comment_delete({ locals, params, request }) {
		const { member } = locals;

		// TODO: Check member permissions

		const { id } = await form({ id: 'string' } as const, request);

		await prisma.comment.deleteMany({
			where: {
				id: id,
				authorId: member.id,
				projectId: member.projectId,
				system: false
			}
		});

		throw redirect(302, `/tasks/${params.id}`);
	},
	async comment_update({ locals, params, request }) {
		const { member } = locals;

		// TODO: Check member permissions

		const { id, content } = await form({ id: 'string', content: 'string' } as const, request);

		await prisma.comment.updateMany({
			data: { content },
			where: {
				id: id,
				authorId: member.id,
				projectId: member.projectId,
				system: false
			}
		});

		throw redirect(302, `/tasks/${params.id}#comment-${id}`);
	},

	async edit({ locals, params, request }) {
		const { project, member } = locals;

		const { content } = await form({ content: 'string' } as const, request);

		try {
			await prisma.task.update({
				where: {
					id_projectId: {
						id: params.id,
						projectId: project.id
					}
				},
				data: { content }
			});

			await system(project.id, params.id, SystemAction.TASK_EDIT, member.id);

			// eslint-disable-next-line no-empty
		} catch (e) {}

		throw redirect(302, `/tasks/${params.id}`);
	},

	async delete({ locals, params }) {
		const { project } = locals;

		try {
			await prisma.task.delete({
				where: {
					id_projectId: {
						id: params.id,
						projectId: project.id
					}
				}
			});
			// eslint-disable-next-line no-empty
		} catch (e) {}

		throw redirect(302, '/tasks');
	},

	async assign({ locals, params }) {
		const { project, member } = locals;

		// TODO: Check member permissions
		const task = await findTask(params, project, undefined);

		try {
			await prisma.assignee.create({
				data: {
					taskId: task.id,
					memberId: member.id,
					projectId: project.id
				}
			});

			await system(project.id, params.id, SystemAction.ASSIGN_SELF, member.id);

			// eslint-disable-next-line no-empty
		} catch (e) {}

		throw redirect(302, `/tasks/${params.id}`);
	},
	async unassign({ locals, params }) {
		const { project, member } = locals;

		// TODO: Check member permissions
		const task = await findTask(params, project, undefined);

		try {
			await prisma.assignee.delete({
				where: {
					taskId_memberId_projectId: {
						taskId: task.id,
						memberId: member.id,
						projectId: project.id
					}
				}
			});

			await system(project.id, params.id, SystemAction.UNASSIGN_SELF, member.id);

			// eslint-disable-next-line no-empty
		} catch (e) {}

		throw redirect(302, `/tasks/${params.id}`);
	}
};
