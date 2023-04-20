import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';
import { safeTask } from '$lib/server/safe';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { project } = locals;

	let page: number;
	try {
		page = parseInt((params as { page: string }).page) || 0;
	} catch (e) {
		page = 0;
	}

	const tasks = await prisma.task.findMany({
		where: {
			projectId: project.id
		},
		include: {
			assignees: {
				include: {
					member: true
				}
			},
			comments: {
				include: {
					author: true
				}
			}
		},
		skip: 10 * page,
		take: 10
	});

	return {
		tasks: tasks.map((t) => safeTask<'', 'project', '', '', 'project', ''>(t)),
		page
	};
};
