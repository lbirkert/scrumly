import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';
import { safeTask } from '$lib/server/safe';

export const load: PageServerLoad = async ({ locals }) => {
	const { project } = locals;

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
	});

	return {
		tasks: tasks.map((t) => safeTask<'', 'project', '', '', 'project', ''>(t)),
	};
};
