import type { Actions } from './$types';

import { form } from '$lib/server/form';
import { prisma } from '$lib/server/prisma';
import { resizeAvatar } from '$lib/server/avatar';

import { redirect, fail } from '@sveltejs/kit';

export const actions: Actions = {
	async project({ locals, request }) {
		const { project } = locals;

		const { name } = await form({ name: 'string' } as const, request);

		// TODO: Check member permissions
		await prisma.project.update({
			where: { id: project.id },
			data: { name }
		});

		throw redirect(302, '/');
	},
	async member({ locals, request }) {
		const { member } = locals;

		const { name } = await form({ name: 'string' } as const, request);

		// TODO: Handle name collisions
		await prisma.member.update({
			where: { id: member!.id },
			data: { name }
		});

		throw redirect(302, '/');
	},
	async avatar({ locals, request }) {
		const { member } = locals;

		const { file } = await form({ file: "file" } as const, request);

		try {
			var avatar = await resizeAvatar(file);
		} catch(e) {
			return fail(400, { error: `${e}` });
		}

		await prisma.member.update({
			where: { id: member!.id },
			data: { avatar }
		});
		
		throw redirect(302, '/');
	}
};
