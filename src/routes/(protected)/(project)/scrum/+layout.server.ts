import type { PageServerLoad } from './$types';
import { safeMember, safeProject } from '$lib/server/safe';

export const load: PageServerLoad = async ({ locals }) => {
	const { project, member } = locals;

	return {
		member: safeMember(member),
		project: safeProject(project)
	};
};
