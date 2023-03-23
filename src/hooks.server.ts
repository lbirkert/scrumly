import { prisma } from '$lib/server/prisma';

import { JWT_SECRET } from '$env/static/private';

import type { Project, Member } from '@prisma/client';
import jwt from 'jsonwebtoken';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { locals, cookies, route } = event;

	if (!route.id?.startsWith('/(static)')) {
		const authCookie = cookies.get('Authorization');

		if (authCookie) {
			const token = authCookie.split(' ')[1];

			try {
				const jwtMember = jwt.verify(token, JWT_SECRET);
				if (typeof jwtMember === 'string') {
					throw new Error('Something went wrong');
				}

				let member = (await prisma.member.findUnique({
					where: {
						id: jwtMember.id
					},
					include: {
						project: true
					}
				})) as Member & { project?: Project };

				locals.project = member.project;

				delete member.project;

				locals.member = member;

				locals.auth = true;
			} catch (error) {
				cookies.delete('Authorization');
				console.error(error);
			}
		}
	}

	return await resolve(event);
};
