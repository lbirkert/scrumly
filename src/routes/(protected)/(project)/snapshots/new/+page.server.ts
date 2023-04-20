import type { Actions } from './$types';

import type { Project } from '@prisma/client';

import { SNAPSHOTS_DIR } from '$env/static/private';

import { secret } from '$lib/server/secret';
import { prisma } from '$lib/server/prisma';

import { redirect } from '@sveltejs/kit';

import { writeFile } from 'fs/promises';
import { join } from 'path';

export const actions: Actions = {
	async default({ locals }) {
		const project = (await prisma.project.findUnique({
			where: { id: locals.project.id },
			include: {
				members: true,
				tasks: true,
				comments: true,
				assignees: true,
				scrums: true
			}
		})) as Project & { members: { login?: string }[] };

		const { id } = await prisma.snapshot.create({
			data: {
				projectId: locals.project.id,
				id: secret(32)
			}
		});

		project.members.forEach((m) => delete m.login);

		await writeFile(join(SNAPSHOTS_DIR, id), JSON.stringify(project));

		throw redirect(302, '/snapshots');
	}
};
