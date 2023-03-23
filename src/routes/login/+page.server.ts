import type { Actions } from './$types';
import { JWT_SECRET } from '$env/static/private';

import { redirect, fail } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

import { prisma } from '$lib/server/prisma';
import { form } from '$lib/server/form';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const { login } = await form({ login: 'string' } as const, request);

		const member = await prisma.member.findUnique({
			where: { login }
		});

		if (!member) {
			return fail(401, {
				error: 'Invalid credentials'
			});
		}

		const token = jwt.sign({ id: member.id }, JWT_SECRET, {
			expiresIn: '1d'
		});

		cookies.set('Authorization', `Bearer ${token}`, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 1 day
		});

		throw redirect(303, '/');
	}
};
