import type { Actions, PageServerLoad } from './$types';

import { error, redirect } from '@sveltejs/kit';

import type { Project, Prisma } from '@prisma/client';

import { prisma } from '$lib/server/prisma';
import { form } from '$lib/server/form';
import { safeIssue } from '$lib/server/safe';

// TODO: find out how to type these
async function findIssue<T extends Prisma.IssueInclude | undefined>(
	params: any,
	project: Project,
	include: T
) {
	try {
		const issue = (
			await prisma.issue.findMany({
				where: {
					id: parseInt(params.id),
					projectId: project.id
				},
				include
			})
		)[0];

		if (!issue) {
			throw new Error();
		}

		return issue;
	} catch (e) {
		console.error(e);
		throw error(404, 'Not found');
	}
}

export const load: PageServerLoad = async ({ locals, params }) => {
	const { project } = locals;

	return {
		issue: safeIssue(
			await findIssue(params, project, {
				comments: { include: { author: true } },
				author: true,
				assignee: true
			} as const)
		)!
	};
};

// Since all actions redirect, we'll replace using
// custom +server.ts and switch to http methods for
// action separation
export const actions: Actions = {
	async comment({ locals, params, request }) {
		const { project, member } = locals;

		const issue = await findIssue(params, project, undefined);

		// TODO: Check member permissions

		const { content } = await form({ content: 'string' } as const, request);

		const { id } = await prisma.comment.create({
			data: {
				author: {
					connect: {
						id: member!.id
					}
				},
				issue: {
					connect: {
						id: issue.id
					}
				},
				content
			}
		});

		throw redirect(301, `/issues/${params.id}#comment-${id}`);
	},
	async toggle({ locals, params }) {
		const { project } = locals;

		const issue = await findIssue(params, project, undefined);

		await prisma.issue.updateMany({
			data: { closedAt: issue.closedAt ? null : new Date() },
			where: {
				id: issue.id
			}
		});

		// TODO: Send system comment

		throw redirect(301, `/issues/${params.id}`);
	},
	async comment_delete({ locals, params, request }) {
		const { member } = locals;

		// TODO: Check member permissions

		const { id } = await form({ id: 'number' } as const, request);

		await prisma.comment.deleteMany({
			where: {
				id: id,
				memberId: member!.id
			}
		});

		throw redirect(301, `/issues/${params.id}`);
	},
	async comment_update({ locals, params, request }) {
		const { member } = locals;

		// TODO: Check member permissions

		const { id, content } = await form({ id: 'number', content: 'string' } as const, request);

		await prisma.comment.updateMany({
			data: { content },
			where: {
				id: id,
				memberId: member!.id
			}
		});

		throw redirect(301, `/issues/${params.id}#comment-${id}`);
	},
	async assign({ locals, params }) {
		const { project, member } = locals;

		// TODO: Check member permissions
		const issue = await findIssue(params, project, undefined);

		await prisma.issue.update({
			data: { assigneeId: issue.assigneeId === member!.id ? null : member!.id },
			where: { id: issue.id },
		});
	},
	async delete({ locals, params }) {
		const { project } = locals;
		
		// TODO: Check member permissions
		const issue = await findIssue(params, project, undefined);

		await prisma.issue.delete({
			where: { id: issue.id }
		});

		throw redirect(302, "/issues");
	},
};
