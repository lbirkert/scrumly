import type { Handle } from "@sveltejs/kit";
import { JWT_SECRET } from '$env/static/private';
import jwt from "jsonwebtoken";

import { db } from "$lib/db";

export const handle: Handle = async ({ event, resolve }) => {
    const authCookie = event.cookies.get("Authorization");

    if(authCookie) {
        const token = authCookie.split(" ")[1];

        try {
            const jwtMember = jwt.verify(token, JWT_SECRET);
            if(typeof jwtMember === "string") {
                throw new Error("Something went wrong");
            }

            event.locals.member = await db.member.findUnique({
                where: {
                    id: jwtMember.id,
                },
            });
        } catch(error) {
            console.error(error);
        }
    }
    
    return await resolve(event);
}
