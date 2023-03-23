import type { PageServerLoad, Actions } from './$types';

import { safeInvite } from '$lib/server/safe';

import { prisma } from '$lib/server/prisma';
import { secret } from '$lib/server/secret';
import { form } from '$lib/server/form';
import { generateAvatar } from '$lib/server/avatar';
import { error, fail } from '@sveltejs/kit';

import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

import type { Prisma } from '@prisma/client';

async function findInvite<T extends Prisma.InviteInclude | undefined>(params: any, include: T) {
	try {
		const issue = await prisma.invite.findUnique({
			where: { id: params.id },
			include
		});

		if (!issue) {
			throw new Error();
		}

		return issue;
	} catch (e) {
		console.error(e);
		throw error(404, 'Not found');
	}
}

export const load: PageServerLoad = async ({ params }) => {
	return {
		invite: safeInvite(await findInvite(params, { creator: true, project: true }))!
	};
};

export const actions: Actions = {
	accept: async ({ cookies, params, locals, request }) => {
		const { name } = await form({ name: 'string' } as const, request);

		const invite = await findInvite(params, undefined);

		if (invite.projectId === locals.member?.projectId) {
			return fail(400, { error: "You can't join this organization" });
		}

		const login = secret();

		// Generate default avatar
		const avatar = generateAvatar();

		const member = await prisma.member.create({
			data: {
				projectId: invite.projectId,
				role: 2,
				name,
				avatar,
				login
			}
		});

		const _token = jwt.sign({ id: member.id }, JWT_SECRET, {
			expiresIn: '1d'
		});

		cookies.set('Authorization', `Bearer ${_token}`, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 1 day
		});

		// Invite usages
		if (invite.usages !== -1) {
			if (invite.usages < 1) {
				await prisma.invite.remove({
					where: { id: invite.id }
				});
			} else {
				await prisma.invite.update({
					where: { id: invite.id },
					data: { usages: invite.usages - 1 }
				});
			}
		}

		return {
			login
		};
	}
};
