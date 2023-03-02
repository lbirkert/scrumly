import { JWT_SECRET, REGISTRATION_TOKEN } from '$env/static/private';

import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";

import jwt from "jsonwebtoken";

import { generateLogin, db } from "$lib/db";

export const actions: Actions = {
    default: async (event) => {
        const formData = Object.fromEntries(await event.request.formData());

        if(!formData.token) {
            return fail(400, {
                error: "Missing token"
            });
        }

        if(REGISTRATION_TOKEN && formData.token as string !== REGISTRATION_TOKEN) {
            return fail(401, {
                error: "Invalid token"
            });
        }

        const login = generateLogin();

        const project = await db.project.create({
            data: {
                name: "Untitled",
            }
        });

        const member = await db.member.create({
            data: {
                projectId: project.id,
                name: "Anonymous",
                role: 0,
                login 
            }
        });

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

        return {
            project,
            login,
        };
    },
};
