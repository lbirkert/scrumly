import { JWT_SECRET, REGISTRATION_TOKEN } from '$env/static/private';

import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";

import jwt from "jsonwebtoken";

import { secret } from "$lib/server/secret";
import { prisma } from "$lib/server/prisma";
import { form } from "$lib/server/form";

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const { token } = await form({ "token": "string" } as const, request);

        if(token !== REGISTRATION_TOKEN) {
            return fail(401, {
                error: "Invalid token"
            });
        }

        const login = secret();

        const project = await prisma.project.create({
            data: {
                name: "Untitled",
            }
        });

        const member = await prisma.member.create({
            data: {
                projectId: project.id,
                name: "Anonymous",
                role: 0,
                login 
            }
        });

        const _token = jwt.sign({ id: member.id }, JWT_SECRET, {
            expiresIn: "1d",
        });

        cookies.set('Authorization', `Bearer ${_token}`, {
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
