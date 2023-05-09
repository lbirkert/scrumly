import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';
import { safeTask } from '$lib/server/safe';

export const load: PageServerLoad = async ({ locals, url }) => {
	const { project } = locals;

	const search = url.searchParams.get('q') || 'is:open';

	const doneState =
		search.includes('is:open') || (search.includes('is:closed') ? false : undefined);

	const tasks = await prisma.task.findMany({
		where: {
			projectId: project.id,
			done: doneState
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
		}
	});

	return {
		tasks: tasks.map((t) => safeTask<'', 'project', '', '', 'project', ''>(t))
	};
};
