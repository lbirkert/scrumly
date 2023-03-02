import type { Actions } from "./$types";
import { JWT_SECRET } from '$env/static/private';

import { redirect, fail } from '@sveltejs/kit';
import jwt from "jsonwebtoken";

import { db } from "$lib/db";

export const actions: Actions = {
    default: async (event) => {
        const formData = Object.fromEntries(await event.request.formData());

        if(!formData.login) {
            return fail(400, {
                error: "Missing login"
            });
        }

        const login = formData.login as string;

        const member = await db.member.findUnique({
            where: { login },
        });

        if(!member) {
            return fail(401, {
                error: "Invalid credentials"
            });
        }

        const token = jwt.sign({ id: member.id }, JWT_SECRET, {
            expiresIn: "1d",
        });

        event.cookies.set('Authorization', `Bearer ${token}`, {
		    httpOnly: true,
		    path: '/',
		    secure: true,
		    sameSite: 'strict',
		    maxAge: 60 * 60 * 24 // 1 day
	    });

        throw redirect(303, "/");
    }
};
