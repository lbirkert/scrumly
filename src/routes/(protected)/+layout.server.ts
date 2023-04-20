import type { LayoutServerLoad } from './$types';

import { safeMember, safeProject } from '$lib/server/safe';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { member, project, auth } = locals;

	if (!auth) {
		throw redirect(302, '/login');
	}

	return {
		member: safeMember<'project', ''>(member),
		project: safeProject(project)
	};
};
